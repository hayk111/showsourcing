import { forkJoin, Observable, of, Subject, ReplaySubject, Subscription, zip, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, first, map, scan, switchMap, tap, mergeMap } from 'rxjs/operators';
import { isObject } from 'util';
import { GlobalQuery } from '~global-services/_global/global.query.interface';
import { SelectParams } from '~global-services/_global/select-params';
import { SubscribeToManyOptions } from '~shared/apollo/interfaces/subscription-option.interface';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';
import { merge, combineLatest, } from 'rxjs';
import { RefetchParams } from '~shared/apollo/services/refetch.interface';

export interface GlobalServiceInterface<T extends { id?: string }> {
	selectOne: (id: string, ...args) => Observable<T>;
	selectMany(params$: Observable<SelectParams>, fields?: string, client?: string): Observable<T[]>;
	selectList: (params$: Observable<SelectParams>) => { refecthParams: RefetchParams, items$: Observable<T[]> };
	selectAll: (fields: string, ...args) => Observable<T[]>;
	update: (entity: T, ...args) => Observable<T>;
	updateMany: (entities: T[], ...args) => Observable<T[]>;
	create: (entity: T, ...args) => Observable<T>;
	deleteOne: (id: string, ...args) => Observable<any>;
	deleteMany: (ids: string[], ...args) => Observable<any>;
}

/**
 * Global service that other entity service can extend to do stuff via graphql,
 * the goal of this service and Wrapper are to alleviate a lot of complexity from the app.
 * Doing so this class becomes a bit complicated.
 */
export abstract class GlobalService<T extends { id?: string }> implements GlobalServiceInterface<T> {

	constructor(
		protected wrapper: ApolloWrapper,
		protected queries: GlobalQuery,
		protected typeName?: string) { }

	// we use a cache so we can change things on update
	private selectOneCache = new Map<string, { subj, obs, result }>();

	/** selects all entity (subscription)
	 * @param id : id of the entity selected
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	selectOne(id: string, fields?: string, client?: string): Observable<T> {
		if (!this.queries.one) {
			throw Error('one query not implemented for this service');
		}
		// this uses a subscription under the hood which doesn't have the benefit of listening for value changes.
		// Therefor we will create a subject where we can push new changes to see those in the view
		if (this.selectOneCache.has(id))
			return this.selectOneCache.get(id).result;

		const obs = this.wrapper.use(client).selectOne(this.queries.one(fields), id));
		const subj = new BehaviorSubject({});
		const result = combineLatest(obs, subj, (latestChanges, newestChanges) => ({ ...latestChanges, ...newestChanges }));
		this.selectOneCache.set(id, { subj, obs, result });
		return result;
	}

	/** selects all entity (query)
	 * @param fields : string to specify the fields we want to query
	 * defaults to id, name
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	selectAll(fields?: string, client?: string): Observable<T[]> {
		if (!this.queries.all) {
			throw Error('all query not implemented for this service');
		}
		return this.wrapper.use(client).selectAll(this.queries.all(fields));
	}

	/** selects slice of data that corresponds to parameters (query)
	 * @param params$ : Observable<SelectParams> to specify what slice of data we are querying
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	 *
	*/
	selectMany(params$: Observable<SelectParams> = of(new SelectParams()), fields?: string, client?: string): Observable<T[]> {
		if (!this.queries.many) {
			throw Error('many query not implemented for this service');
		}

		return params$.pipe(
			distinctUntilChanged(),
			switchMap((params: SelectParams) => this.wrapper.use(client).selectMany(params)),
		);

	}

	/** selects slice of data that corresponds to parameters. The Difference with selectMany is that
	 * this uses a query under the hood and not a subscription
 	* @param params$ : Observable<SelectParams> to specify what slice of data we are querying
	*/
	selectList(params$: Observable<SelectParams> = of(new SelectParams()), fields?: string, client?: string)
		: { refecthParams: RefetchParams, items$: Observable<T[]> } {

		if (!this.queries.list) {
			throw Error('list query not implemented for this service');
		}
		const gql = this.queries.list(fields);
		const items$: Observable<T[]> = params$.pipe(
			distinctUntilChanged(),
			switchMap((params: SelectParams) => this.wrapper.selectList(gql, params)),
		);
		return {
			refecthParams: { params$, gql },
			items$
		};
	}

	/**
	 * @param params$ : Observable<SelectParams> to specify what slice of data we are querying,
	 * the difference with select many is that when the page change the result is added to the previous one
	 * so we can have infinite scrolling. The drawback is that this won't give us real time modification of colleguas over websocket.
	 */
	selectInfiniteList(params$: Observable<SelectParams> = of(new SelectParams()), fields?: string, client?: string)
		: { refecthParams: RefetchParams, items$: Observable<T[]> } {
		let { items$, refecthParams } = this.selectList(params$, fields, client);
		items$ = items$.pipe(
			// adding to the previous resultset
			scan((prev, curr: { result, page }) => {
				if (curr.page === 0) {
					return curr.result;
				} else {
					return [...prev, ...curr.result];
				}
			}, [])
		);

		return { items$, refecthParams };
	}

	/** update an entity
	 * @param entity : entity with an id and the fields we want to update
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	update(entity: T, client?: string): Observable<any> {
		const gql = this.queries.update(Object.keys(entity).toString());

		if (!this.queries.update) {
			throw Error('update query not implemented for this service');
		}

		// updating select one cache so changes are reflected when using selectOne(id)
		if (this.selectOneCache.has(entity.id)) {
			this.selectOneCache.get(entity.id).subj.next(entity);
		}

		return this.wrapper.use(client).update({
			gql,
			input: entity,
			typename: this.typeName
		});
	}

	/** update many entities
	 * @param entities : Array of entities to update, each entity needs an id to be found in the db
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	updateMany(entities: T[], client?: string): Observable<any> {
		return forkJoin(entities.map(entity => this.update(entity, client)));
	}

	/** create an entity
	 * @param entity : entity with an id and the fields we want to create
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	create(entity: T, refetchParams: RefetchParams, client?: string): Observable<any> {
		if (!this.queries.create) {
			throw Error('create query not implemented for this service');
		}
		return this.wrapper.use(client).create({
			gql: this.queries.create(Object.keys(entity).toString()),
			input: entity,
			typename: this.typeName
		});
	}

	deleteOne(id: string, refetchParams, client?: string): Observable<any> {
		if (!this.queries.deleteOne) {
			throw Error('delete one query not implemented for this service');
		}
		return this.wrapper.use(client).delete({
			gql: this.queries.deleteOne(),
			id,
			typename: this.typeName,
			refetchParams
		});
	}

	deleteMany(ids: string[], client?: string): Observable<any> {
		if (!this.queries.deleteMany) {
			throw Error('delete many query not implemented for this service');
		}
		return this.wrapper.use(client).deleteMany({
			gql: this.queries.deleteMany(),
			ids,
			typename: this.typeName,
			refetchParams
		});
	}

}


