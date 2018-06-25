import { Observable, of, Subject, ReplaySubject } from 'rxjs';
import { map, scan, startWith, switchMap, distinctUntilChanged, shareReplay, share } from 'rxjs/operators';
import { ApolloClient } from '~shared/apollo';
import { PER_PAGE } from '~utils';

import { GlobalQuery } from './global.query.interface';
import { SelectParams } from './select-params';
import { debug } from '~utils/debug.rxjs.pipe';

export interface GlobalServiceInterface<T> {
	selectOne: (id: string) => Observable<T>;
	selectMany?: (params$?: Observable<SelectParams>, take?: number) => Observable<T[]>;
	selectAll: (fields: string) => Observable<T[]>;
	update: (entity: T) => Observable<T>;
	create: (entity: T) => Observable<T>;
	deleteOne: (id: string) => Observable<any>;
	deleteMany: (ids: string[]) => Observable<any>;
}


export abstract class GlobalService<T> implements GlobalServiceInterface<T> {

	/** Select one observable to deduplicate logic execution
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
	 * Using pipeline to deduplicate logic
	 */
	private selectAllFields$ = new ReplaySubject<string>(1);
	private selectAll$ = this.selectAllFields$.asObservable().pipe(
		distinctUntilChanged(),
		switchMap(fields => this.apollo.selectMany({ gql: this.queries.all(fields) })),
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

	selectMany(params$: Observable<SelectParams> = of({}), take: number = PER_PAGE) {
		return params$.pipe(
			map(params => ({
				// assigning default values in case none have been specified
				page: params.page || 0,
				query: params.query || '',
				sort: params.sort || {}
			})),
			// we start with this
			startWith({ page: 0, sort: {}, query: '' } as SelectParams),
			// we query gql
			switchMap(({ page, sort, query }: SelectParams) => {
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
			}, [])
		);
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


