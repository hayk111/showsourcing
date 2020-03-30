import { Injectable } from '@angular/core';
import { MutationOptions } from 'apollo-client';
import { ObservableQuery as ApolloObservableQuery, WatchQueryOptions } from 'aws-appsync/node_modules/apollo-client';
import { from, Observable, forkJoin } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { log } from '~utils/log';
import { Entity } from '../models/_entity.model';
import { QueryPool } from '../queries/query-pool.class';
import { QueryType } from '../queries/query-type.enum';
import { Typename } from '../typename.type';
import { client } from './client';
import { ApiLogger } from './_api-logger.class';
import { GqlHelper } from './_gql-helper.class';
import { uuid } from '~utils';
import { TeamService } from '~core/auth';

export interface ObservableQuery<T = any> extends ApolloObservableQuery<T> {
	response$: Observable<any>;
	data$: Observable<T>;
	total$?: Observable<number>;
	queryName: string;
}

export interface FilterParams {
	filter?: any;
	sort?: { field: string, direction: 'ASC' | 'DESC' };
	limit?: number;
	nextToken?: string;
}

export type ApiQueryOption = Partial<Omit<WatchQueryOptions, 'variables' | 'query'>>;
export type ApiMutationOption = Partial<Omit<MutationOptions, 'variables' | 'mutation'>>;

/**
 * service to do crud operations on entities
 */
@Injectable({ providedIn: 'root' })
export class ApiService {

	// set by UserService so we don't have circular dep
	private _userId: string;
	setUserId(id: string) {
		this._userId = id;
	}
	// set by TeamService so we don't have circular dep
	private _teamId: string;
	setTeamId(id: string) {
		this._teamId = id;
	}

	constructor(private authSrv: AuthenticationService) {
		this.authSrv.signOut$.subscribe(_ => client.resetStore());
	}

	///////////////////////////////
	//          QUERY            //
	///////////////////////////////


	/** performs an apollo query
	 * @param options options provided to apollo
	 * @param hasItems whether we should extract items {} from the response
	 */
	query<T>(options: WatchQueryOptions, hasItems = true): ObservableQuery<T> {
		const queryName = GqlHelper.getQueryName(options.query);
		ApiLogger.logRequest(options);

		const queryRef = client.watchQuery(options) as ObservableQuery<any>;
		const response$ = from(queryRef).pipe(
			// filter cache response when there is no cache
			filter(r => !r.stale),
			filter((r: any) => this.checkError(r, queryName)),
			map(({ data }) => data[queryName]),
			tap(data => ApiLogger.logResponse(options, data))
		);
		queryRef.queryName = queryName;
		queryRef.response$ = response$;
		queryRef.data$ = response$.pipe(map(r => hasItems ? r.items : r));
		return queryRef;
	}

	///////////////////////////////
	//          MUTATE           //
	///////////////////////////////

	/** performs an apollo mutation
	 * @param options options provided to apollo
	 */
	mutate(options: MutationOptions) {
		const queryName = GqlHelper.getQueryName(options.mutation);
		ApiLogger.logRequest(options);
		// removing the typename from the input
		delete options.variables.input.__typename;
		return from(client.mutate(options)).pipe(
			map(({ data }) => data[queryName]),
			tap(data => ApiLogger.logResponse(options, data))
		);
	}

	///////////////////////////////
	//           GET             //
	///////////////////////////////

	/**
	 * Get one item by id, (query, optimistic UI)
	 * @param typename: name of the entity you are querying
	 * @param id: the id of the entity
	 * @param options: apollo options, variable and query will be overrided
	 */
	get<T>(
		typename: Typename,
		id: string,
		apiOptions: ApiQueryOption = {}
	): ObservableQuery<T> {
		const options = apiOptions as WatchQueryOptions;
		options.variables = { id };
		options.query = QueryPool.getQuery(typename, QueryType.GET);
		return this.query<T>(options, false);
	}

	/////////////////////////////
	//         SEARCH          //
	/////////////////////////////

	/**
	 * Query many entities
	 * (Query, optimistic UI)
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param variables: variables for filtering, sorting, and paginate
	 * @param client: name of the client you want to use, if none is specified the default one is used
	 * @param options: apollo options, variable and query will be overrided
	 */
	search<T>(
		typename: Typename,
		variables: FilterParams,
		apiOptions: ApiQueryOption = {}
	): ObservableQuery<T[]> {
		const options = apiOptions as WatchQueryOptions;
		options.variables = variables;
		options.query = QueryPool.getQuery(typename, QueryType.SEARCH);
		const query = this.query<T[]>(options);
		query.total$ = query.response$.pipe(map(r => r.total));
		return query;
	}

	/////////////////////////////
	//        LIST BY          //
	/////////////////////////////
	/**
	 * Query all entities by a referenced Entity (e.g: all teams that belongs to an user)
	 * (Query, optimistic UI)
	 * @param entityName: the name of the Entity we want to query
	 * @param byEntityName: the entity for wich the entityName will belongs to
	 * @param byId: the ID of the referenced entity
	 * @param options: apollo options, variable and query will be overrided
	 */
	listBy<T>(
		typename: Typename,
		byProperty: string = 'Team',
		byId: string = this._teamId,
		apiOptions: ApiQueryOption = {}
	): ObservableQuery<T[]> {
		const options = apiOptions as WatchQueryOptions;
		options.variables = {byId, limit: 10000};
		const queryBuilder = QueryPool.getQuery(typename, QueryType.LIST_BY); // the listBy get a method to build the query
		options.query = queryBuilder(byProperty);
		return this.query<T[]>(options);
	}

	/////////////////////////////
	//         CREATE          //
	/////////////////////////////

	/** create one entity
	 * @param typename: name of the entity we want to create
	 * @param entity : entity we want to create
	 * @param options: apollo options, variable and query will be overrided
	 */
	create<T extends Entity>(
		typename: Typename,
		entity: T & Entity,
		apiOptions: ApiMutationOption = {}
	): Observable<T> {
		const options = apiOptions as MutationOptions;
		options.mutation = QueryPool.getQuery(typename, QueryType.CREATE);
		// TODO remove this condition when the audits are all similars
		if (typename !== 'Company' && typename !== 'Team') {
			entity.id = uuid();
			entity.createdAt = new Date().toISOString();
			entity.lastUpdatedAt = new Date().toISOString();
			entity.deleted = false;
			entity.createdByUserId = this._userId;
			entity.lastUpdatedByUserId = this._userId;
			entity.teamId = this._teamId;
		}
		options.variables = { input: { ...entity } };
		return this.mutate(options);
	}

	/////////////////////////////
	//          UPDATE         //
	/////////////////////////////

	/** Update one entity
	 * @param typename: name of the entity we want to create
	 * @param entity : entity we want to create
	 * @param options: apollo options, variable and query will be overrided
	 */
	update<T extends Entity>(
		typename: Typename,
		entity: T,
		apiOptions: ApiMutationOption = {}
		): Observable<T> {
		const options = apiOptions as MutationOptions;
		entity.__typename = typename;
		if (typename !== 'Company' && typename !== 'Team') {
			entity.createdAt = new Date().toISOString();
			entity.lastUpdatedAt = new Date().toISOString();
			entity.deleted = false;
			entity.createdByUserId = this._userId;
			entity.lastUpdatedByUserId = this._userId;
			entity.teamId = this._teamId;
		}
		options.variables = { input: entity };
		options.mutation = QueryPool.getQuery(typename, QueryType.UPDATE);
		options.optimisticResponse = this.getOptimisticResponse(options);
		return this.mutate(options);
	}

	/////////////////////////////

	/** Update one entity
	 * @param typename: name of the entity we want to create
	 * @param entities : entities we want to create
	 * @param options: apollo options, variable and query will be overrided
	 */
	updateMany<T extends Entity>(
		typename: Typename,
		entities: T[],
		apiOptions: ApiMutationOption = {}
		): Observable<T[]> {
		return forkJoin(
			entities.map(entity => this.update(typename, entity, apiOptions))
		);
	}

	/////////////////////////////
	//          DELETE         //
	/////////////////////////////

	delete<T extends Entity>(
		typename: Typename,
		entity: T,
		apiOptions: ApiMutationOption = {}
		): Observable<T> {
		const options = apiOptions as MutationOptions;
		options.variables = { input: { id: entity.id, _version: entity._version } };
		options.mutation = QueryPool.getQuery(typename, QueryType.DELETE);
		return this.mutate(options);
	}

	deleteMany<T extends Entity>(
		typename: Typename,
		entities: T[],
		apiOptions: ApiMutationOption = {}
		): Observable<T[]> {
		return forkJoin(
			entities.map(entity => this.update(typename, entity, apiOptions))
		);
	}


	/////////////////////////////
	//      CACHE UPDATES      //
	/////////////////////////////


	addToList(query: ObservableQuery, elem: any) {
		const r: any = client.readQuery(query.options);
		const items = r[query.queryName].items;
		r[query.queryName].items = [
			elem,
			...items.filter(item => item.id !== elem.id)
		];
		client.writeQuery({ ...query.options, data: r });
	}

	deleteFromList(query: ObservableQuery, id: string) {
		const r: any = client.readQuery(query.options);
		const items = r[query.queryName].items;
		r[query.queryName].items = items.filter(item => item.id !== id);
		client.writeQuery({ ...query.options, data: r });
	}

	/** creates an optimistic response the way apollo expects it */
	protected getOptimisticResponse(options: MutationOptions) {
		const queryName = GqlHelper.getQueryName(options.mutation);
		const input = options.variables.input;
		if (input.__typename) {
			return {
				__typename: 'Mutation',
				[queryName]: {
					...input
				}
			};
		} else {
			log.warn(`
				Doing a mutation without optimistic ui: ${queryName},
				when doing an update use "new Entity()" or specify the "__typename"
			`);
		}
	}

	/** check if a graphql call has given any error */
	protected checkError(r: { data: any; errors: any[]; loading: boolean }, title: string) {
		if (r.errors) {
			r.errors.forEach(e => log.error(e));
			return false;
		} else if (!r.data) {
			log.debug(`No data for the query "${title}"`, r);
			log.debug(r);
			return false;
		}
		return true;
	}

	/** gets the mutated fields in case we want to ask for the in update */
	private getMutatedFields(object: any) {
		const keys = Object.keys(object);
		// removing the typename property
		const patchedParts = keys.filter(key => key !== '__typename')
			// transforming fields of entity into gql update obj
			.map(key => this.getGraphqlField(key, object));
		return patchedParts.join(' ');
	}

	private getGraphqlField(key, obj) {
		const val = obj[key];
		if (Array.isArray(val)) {
			if (val.length > 0) {
				if (val[0] instanceof Object) {
					// take fields of last elements (so when we add new stuff)
					return `${key} { ${this.getMutatedFields(val[val.length - 1])} }`;
				} else {
					return key;
				}
			} else {
				return '';
			}
		} else if (val instanceof Object) {
			return `${key} { ${this.getMutatedFields(val)} }`;
		} else if (!val) {
			return '';
		} else {
			return key;
		}
	}

}

