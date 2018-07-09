import { forkJoin, Observable, of, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, mergeMap, scan, switchMap } from 'rxjs/operators';
import { isObject } from 'util';
import { GqlClient } from '~shared/apollo';

import { GlobalQuery } from './global.query.interface';
import { SelectParams } from './select-params';

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
		switchMap(id => this.gqlClient.selectOne({ gql: this.queries.one, id }))
	);

	/**
	 * Pipelines Select all
	 */
	private selectAllFields$ = new ReplaySubject<string>(1);
	private selectAll$ = this.selectAllFields$.asObservable().pipe(
		distinctUntilChanged(),
		switchMap(fields => this.gqlClient.selectMany({ gql: this.queries.all(fields) }))
	);

	/**
	 * Pipelines Select many:
	 *
	 * selectManyParams$ : subject where we push params to sort, paginate and filter.
	 * selectMany$ : when the params change then so does this observable,
	 * which is returned by the selectMany function
	 */
	selectManyParams$ = new ReplaySubject<Observable<SelectParams>>(1);
	selectMany$ = this.selectManyParams$.asObservable().pipe(
		// retrieve params from their observable form
		mergeMap(params$ => params$),
		// when the params haven't changed we shouldn't do anything
		distinctUntilChanged(),
		// then we query graphql to get a suscription to some part of the data
		mergeMap(({ page, sort, query, take }: SelectParams) => {
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
			return this.gqlClient.selectMany(options).pipe(
				map(data => ({ data, page }) as any)
			);
		}),
		// we append the result if page was incremented
		// else we just return the result
		scan((acc: any, curr: any) => {
			return curr.page === 0 ? curr.data : acc.concat(curr.data);
		}, [])
	);

	constructor(
		protected gqlClient: GqlClient,
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
		return this.gqlClient.update({
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
		return this.gqlClient.create({
			gql: this.queries.create,
			input: entity,
			typename: this.typeName
		});
	}

	deleteOne(id: string): Observable<any> {
		if (!this.queries.deleteOne) {
			throw Error('delete one query not implemented for this service');
		}
		return this.gqlClient.delete({
			gql: this.queries.deleteOne,
			id,
			typename: this.typeName
		});
	}

	deleteMany(ids: string[]): Observable<any> {
		if (!this.queries.deleteMany) {
			throw Error('delete many query not implemented for this service');
		}
		return this.gqlClient.deleteMany({
			gql: this.queries.deleteMany,
			ids,
			typename: this.typeName
		});
	}

	/** Michael did this:
	 *  This is used to eliminate spaces at the sides of the strings in the entity
	 */
	private trim(entity: T) {
		Object.entries(entity).forEach(([k, v]) => {
			// if (isObject(v)) this.trim(v); // enable this line in order to do every objects inside the entity
			if (!isObject(v) && typeof v === 'string') entity[k] = v.trim();
		});
	}
}


