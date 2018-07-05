import { Observable, of, ReplaySubject, forkJoin } from 'rxjs';
import { distinctUntilChanged, flatMap, map, scan, switchMap, shareReplay } from 'rxjs/operators';
import { ApolloClient } from '~shared/apollo';

import { GlobalQuery } from './global.query.interface';
import { SelectParams } from './select-params';
import { isObject } from 'util';

export interface GlobalServiceInterface<T> {
	selectOne: (id: string, ...args) => Observable<T>;
	selectMany?: (params$?: Observable<SelectParams>, ...args) => Observable<T[]>;
	selectAll: (fields: string, ...args) => Observable<T[]>;
	update: (entity: T, ...args) => Observable<T>;
	updateMany: (entities: T[], ...args) => Observable<T[]>;
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
		switchMap(id => this.apollo.selectOne({ gql: this.queries.one, id }))
	);

	/**
	 * Pipelines Select all
	 */
	private selectAllFields$ = new ReplaySubject<string>(1);
	private selectAll$ = this.selectAllFields$.asObservable().pipe(
		distinctUntilChanged(),
		switchMap(fields => this.apollo.selectMany({ gql: this.queries.all(fields) }))
	);

	/**
	 * Pipelines Select many
	 */
	selectManyParams$ = new ReplaySubject<Observable<SelectParams>>(1);
	selectMany$ = this.selectManyParams$.asObservable().pipe(
		// retrieve params
		flatMap(params$ => params$),
		distinctUntilChanged(),
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
			return [...acc, ...curr.data];
		}, [])
	);

	constructor(
		protected apollo: ApolloClient,
		protected queries: GlobalQuery,
		protected typeName?: string) { }

	selectOne(id: string): Observable<T> {
		if (!this.queries.one) {
			throw Error('one query not implemented for this service');
		}
		this.selectOneId$.next(id);
		return this.selectOne$;
	}

	selectAll(fields: string = 'id, name'): Observable<T[]> {
		if (!this.queries.all) {
			throw Error('all query not implemented for this service');
		}
		this.selectAllFields$.next(fields);
		return this.selectAll$;
	}

	selectMany(params$: Observable<SelectParams> = of(new SelectParams())): Observable<T[]> {
		if (!this.queries.list) {
			throw Error('list / many query not implemented for this service');
		}
		this.selectManyParams$.next(params$);
		return this.selectMany$;
	}

	update(entity: T): Observable<any> {
		this.trim(entity);
		if (!this.queries.update) {
			throw Error('update query not implemented for this service');
		}
		return this.apollo.update({
			gql: this.queries.update,
			input: entity,
			typename: this.typeName
		});
	}

	updateMany(entities: T[]): Observable<any> {
		return forkJoin(entities.map(entity => this.update(entity)));
	}

	create(entity: T): Observable<any> {
		this.trim(entity);
		if (!this.queries.create) {
			throw Error('create query not implemented for this service');
		}
		return this.apollo.create({
			gql: this.queries.create,
			input: entity,
			typename: this.typeName
		});
	}

	deleteOne(id: string): Observable<any> {
		if (!this.queries.deleteOne) {
			throw Error('delete one query not implemented for this service');
		}
		return this.apollo.delete({
			gql: this.queries.deleteOne,
			id,
			typename: this.typeName
		});
	}

	deleteMany(ids: string[]): Observable<any> {
		if (!this.queries.deleteMany) {
			throw Error('delete many query not implemented for this service');
		}
		return this.apollo.deleteMany({
			gql: this.queries.deleteMany,
			ids,
			typename: this.typeName
		});
	}

	/** This is used to elimnate spaces at the sides of the strings in the entity*/
	private trim(entity: T) {
		Object.entries(entity).forEach(([k, v]) => {
			// if (isObject(v)) this.trim(v); // enable this line in order to do every objects inside the entity
			if (!isObject(v) && typeof v === 'string') entity[k] = v.trim();
		});
	}
}


