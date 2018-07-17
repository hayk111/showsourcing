import { Observable, of, ReplaySubject, Subject, forkJoin } from 'rxjs';
import { distinctUntilChanged, flatMap, map, scan, switchMap, shareReplay, merge, tap, mergeMap } from 'rxjs/operators';
import { isObject } from 'util';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { GlobalQuery } from './global.query.interface';
import { SelectParams } from './select-params';
import { SubscribeToManyOptions } from '~shared/apollo/interfaces/subscription-option.interface';

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

	constructor(
		protected wrapper: ApolloWrapper,
		protected queries: GlobalQuery,
		protected typeName?: string) { }



	/** selects all entity
 	* @param id : id of the entity selected
	*/
	selectOne(id: string): Observable<T> {
		if (!this.queries.one) {
			throw Error('one query not implemented for this service');
		}
		return this.wrapper.selectOne({ gql: this.queries.one, id });
	}

	/** selects all entity
	 * @param fields : string to specify the fields we want to query
	 * defaults to id, name
	*/
	selectAll(fields: string = 'id, name'): Observable<T[]> {
		if (!this.queries.all) {
			throw Error('all query not implemented for this service');
		}
		return this.wrapper.selectAll({ gql: this.queries.all(fields) });
	}

	/** selects all entity
 	* @param params$ : Observable<SelectParams> to specify what slice of data we are querying
	*/
	selectMany(params$: Observable<SelectParams> = of(new SelectParams())): Observable<T[]> {
		if (!this.queries.list) {
			throw Error('list / many query not implemented for this service');
		}
		return params$.pipe(
			map((params: SelectParams) => params.toWrapperOptions(this.queries.list)),
			distinctUntilChanged(),
			switchMap((opts: SubscribeToManyOptions) => this.wrapper.selectMany(opts))
		);
	}

	/** update an entity
 	* @param entity : entity with an id and the fields we want to update
	*/
	update(entity: T): Observable<any> {
		this.trim(entity);
		if (!this.queries.update) {
			throw Error('update query not implemented for this service');
		}
		return this.wrapper.update({
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
		return this.wrapper.create({
			gql: this.queries.create,
			input: entity,
			typename: this.typeName
		});
	}

	deleteOne(id: string): Observable<any> {
		if (!this.queries.deleteOne) {
			throw Error('delete one query not implemented for this service');
		}
		return this.wrapper.delete({
			gql: this.queries.deleteOne,
			id,
			typename: this.typeName
		});
	}

	deleteMany(ids: string[]): Observable<any> {
		if (!this.queries.deleteMany) {
			throw Error('delete many query not implemented for this service');
		}
		return this.wrapper.deleteMany({
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


