import { Observable, of, Subject, ReplaySubject } from 'rxjs';
import { map, scan, startWith, switchMap, distinctUntilChanged, shareReplay, share, flatMap, tap } from 'rxjs/operators';
import { ApolloClient } from '~shared/apollo';
import { PER_PAGE } from '~utils';

import { GlobalQuery } from './global.query.interface';
import { SelectParams } from './select-params';
import { debug } from '~utils/debug.rxjs.pipe';

export interface GlobalServiceInterface<T> {
	selectOne: (id: string, ...args) => Observable<T>;
	selectMany?: (params$?: Observable<SelectParams>, ...args) => Observable<T[]>;
	selectAll: (fields: string, ...args) => Observable<T[]>;
	update: (entity: T, ...args) => Observable<T>;
	create: (entity: T, ...args) => Observable<T>;
	deleteOne: (id: string, ...args) => Observable<any>;
	deleteMany: (ids: string[], ...args) => Observable<any>;
}


export abstract class GlobalService<T> implements GlobalServiceInterface<T> {

	/** Pipeline Select one : to deduplicate logic execution
	 *  IE: Using a pipeline so we don't get the response 5 times when we are subscribing
	 *  From 5 different components.
	 */
	private selectOneId$ = new ReplaySubject<string>(1);
	private selectOne$ = this.selectOneId$.asObservable().pipe(
		distinctUntilChanged(),
		switchMap(id => this.apollo.selectOne({ gql: this.queries.one, id })),
		shareReplay(1)
	);

	/**
	 * Pipelines Select all
	 */
	private selectAllFields$ = new ReplaySubject<string>(1);
	private selectAll$ = this.selectAllFields$.asObservable().pipe(
		distinctUntilChanged(),
		switchMap(fields => this.apollo.selectMany({ gql: this.queries.all(fields) })),
		shareReplay(1)
	);

	/**
	 * Pipelines Select many
	 */
	selectManyParams$ = new ReplaySubject<Observable<SelectParams>>(1);
	selectMany$ = this.selectManyParams$.asObservable().pipe(
		// retrieve params
		flatMap(params$ => params$),
		tap(d => { debugger; }),
		distinctUntilChanged((x, y) => (
			x.page === y.page &&
			x.take === y.take &&
			x.query === y.query &&
			x.sort.sortBy === y.sort.sortBy &&
			x.sort.sortOrder === y.sort.sortOrder
		)),
		tap(d => { debugger; }),
		// we query gql
		switchMap(({ page, sort, query, take }: SelectParams) => {
			// putting those in variables form
			const sortBy = sort.sortBy;
			const descending = sort.sortOrder === 'ASC';
			const options = {
				gql: this.queries.list,
				skip: page * take,
				take,
				sortBy,
				descending,
				query
			};
			return this.apollo.selectMany(options).pipe(
				map(data => ({ data, page }) as any)
			);
		}),
		// we append the result if page was incremented
		scan((acc: any, curr: any) => {
			if (curr.page === 0)
				return curr.data;
			return acc.push(curr);
		}, []),
		shareReplay(1)
	);

	constructor(
		protected apollo: ApolloClient,
		protected queries: GlobalQuery,
		protected typeName?: string) { }

	selectOne(id: string): Observable<T> {
		this.selectOneId$.next(id);
		return this.selectOne$;
	}

	selectAll(fields: string = 'id, name'): Observable<T[]> {
		this.selectAllFields$.next(fields);
		return this.selectAll$;
	}

	selectMany(params$: Observable<SelectParams> = of(new SelectParams())): Observable<T[]> {
		this.selectManyParams$.next(params$);
		return this.selectMany$;
	}

	update(entity: T): Observable<any> {
		return this.apollo.update({
			gql: this.queries.update,
			input: entity,
			typename: this.typeName
		});
	}

	create(entity: T): Observable<any> {
		return this.apollo.create({
			gql: this.queries.create,
			input: entity,
			typename: this.typeName
		});
	}

	deleteOne(id: string): Observable<any> {
		return this.apollo.delete({
			gql: this.queries.deleteOne,
			id,
			typename: this.typeName
		});
	}

	deleteMany(ids: string[]): Observable<any> {
		return this.apollo.deleteMany({
			gql: this.queries.deleteMany,
			ids,
			typename: this.typeName
		});
	}

}


