import { forkJoin, Observable, of } from 'rxjs';
import { distinctUntilChanged, first, map, scan, switchMap } from 'rxjs/operators';
import { isObject } from 'util';
import { GlobalQuery } from '~global-services/_global/global.query.interface';
import { SelectParams } from '~global-services/_global/select-params';
import { SubscribeToManyOptions } from '~shared/apollo/interfaces/subscription-option.interface';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

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
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	selectOne(id: string, fields?: string, client?: string): Observable<T> {
		if (!this.queries.one) {
			throw Error('one query not implemented for this service');
		}
		return this.wrapper.use(client).selectOne({ gql: this.queries.one(fields), id });
	}

	/** selects all entity
	 * @param fields : string to specify the fields we want to query
	 * defaults to id, name
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	selectAll(fields?: string, client?: string): Observable<T[]> {
		if (!this.queries.all) {
			throw Error('all query not implemented for this service');
		}
		return this.wrapper.use(client).selectAll({ gql: this.queries.all(fields) });
	}

	/** selects slice of data that corresponds to parameters
	 * @param params$ : Observable<SelectParams> to specify what slice of data we are querying
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	selectMany(params$: Observable<SelectParams> = of(new SelectParams()), fields?: string, client?: string): Observable<T[]> {
		if (!this.queries.many) {
			throw Error('many query not implemented for this service');
		}
		return params$.pipe(
			map((params: SelectParams) => params.toWrapperOptions(this.queries.many(fields))),
			distinctUntilChanged(),
			switchMap((opts: SubscribeToManyOptions) => this.wrapper.use(client).selectMany(opts))
		);
	}



	/** selects slice of data that corresponds to parameters. The Difference with selectMany is that
	 * this uses a query under the hood and not a subscription
 	* @param params$ : Observable<SelectParams> to specify what slice of data we are querying
	*/
	// selectList(params$: Observable<SelectParams> = of(new SelectParams())): Observable<T[]> {
	// 	// if (!this.queries.list) {
	// 	// 	throw Error('list query not implemented for this service');
	// 	// }
	// 	// return params$.pipe(
	// 	// 	map((params: SelectParams) => params.toWrapperOptions(this.queries.many)),
	// 	// 	distinctUntilChanged(),
	// 	// 	switchMap((opts: SubscribeToManyOptions) => this.wrapper.selectList(opts))
	// 	// );
	// }
	/**
	 * @param params$ : Observable<SelectParams> to specify what slice of data we are querying,
	 * the difference with select many is that when the page change the result is added to the previous one
	 * so we can have infinite scrolling. The drawback is that this won't give us real time modification of colleguas over websocket.
	 */
	selectInfiniteList(params$: Observable<SelectParams> = of(new SelectParams()), fields?: string): Observable<any> {
		return params$.pipe(
			// taking the first result of a selectMany
			switchMap(
				params => {
					debugger;
					return this.selectMany(of(params), fields).pipe(
						first(),
						map(result => ({ result, page: params.page }))
					)
				}
			),
			// adding to the previous resultset
			scan((prev, curr: { result, page }) => {
				if (curr.page === 0) {
					return curr.result;
				} else {
					return [...prev, ...curr.result];
				}
			}, [])
		);
	}

	/** update an entity
	 * @param entity : entity with an id and the fields we want to update
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	update(entity: T, fields?: string, client?: string): Observable<any> {
		// this.trim(entity);
		if (!this.queries.update) {
			throw Error('update query not implemented for this service');
		}
		return this.wrapper.use(client).update({
			gql: this.queries.update(fields),
			input: entity,
			typename: this.typeName
		});
	}

	/** update many entities
	 * @param entities : Array of entities to update, each entity needs an id to be found in the db
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	updateMany(entities: T[], fields?: string, client?: string): Observable<any> {
		return forkJoin(entities.map(entity => this.update(entity, fields, client)));
	}

	/** create an entity
	 * @param entity : entity with an id and the fields we want to create
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	create(entity: T, fields?: string, client?: string): Observable<any> {
		// this.trim(entity);
		if (!this.queries.create) {
			throw Error('create query not implemented for this service');
		}
		return this.wrapper.use(client).create({
			gql: this.queries.create(fields),
			input: entity,
			typename: this.typeName
		});
	}

	deleteOne(id: string, client?: string): Observable<any> {
		if (!this.queries.deleteOne) {
			throw Error('delete one query not implemented for this service');
		}
		return this.wrapper.use(client).delete({
			gql: this.queries.deleteOne,
			id,
			typename: this.typeName
		});
	}

	deleteMany(ids: string[], client?: string): Observable<any> {
		if (!this.queries.deleteMany) {
			throw Error('delete many query not implemented for this service');
		}
		return this.wrapper.use(client).deleteMany({
			gql: this.queries.deleteMany,
			ids,
			typename: this.typeName
		});
	}


	// TODO: Michael this should be a middleware and not polute global service sorry but it's not this class's responsibility

	/** Michael did this:
	 *  This is used to eliminate spaces at the sides of the strings in the entity properties.
	 *  CopyRight Michael Corp.
	 */
	// private trim(entity: T) {
	// 	Object.entries(entity).forEach(([k, v]) => {
	// 		if (!isObject(v) && typeof v === 'string') entity[k] = v.trim();
	// 	});
	// }
}


