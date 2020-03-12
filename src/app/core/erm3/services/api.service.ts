import { Injectable } from '@angular/core';
import { MutationOptions } from 'apollo-client';
import { ObservableQuery as ApolloObservableQuery, WatchQueryOptions } from 'aws-appsync/node_modules/apollo-client';
import { from, Observable } from 'rxjs';
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

export interface ObservableQuery<T = any> extends ApolloObservableQuery<T> {
	data$: Observable<T>;
	queryName: string;
}

export interface FilterParams {
	filter?: any;
	sort?: any;
	limit?: number;
	nextToken?: string;
}

export type ApiQueryOption = Partial<Omit<WatchQueryOptions, 'variables' | 'queries'>>;
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
	query(options: WatchQueryOptions, hasItems: boolean = true) {
		const queryName = GqlHelper.getQueryName(options.query);
		ApiLogger.logRequest(options);

		const queryRef = client.watchQuery(options) as ObservableQuery<any>;
		const data$ = from(queryRef).pipe(
			// filter cache response when there is no cache
			filter(r => !r.stale),
			filter((r: any) => this.checkError(r, queryName)),
			map(({ data }) => hasItems ? data[queryName].items : data[queryName]),
			tap(data => ApiLogger.logResponse(options, data))
		);
		queryRef.data$ = data$;
		return queryRef;
	}

	///////////////////////////////
	//         MUTATION          //
	///////////////////////////////

	/** performs an apollo mutation
	 * @param options options provided to apollo
	 */
	mutate(options: MutationOptions) {
		const queryName = GqlHelper.getQueryName(options.mutation);
		ApiLogger.logRequest(options);

		return from(client.mutate(options)).pipe(
			map(r => r[queryName]),
			tap(data => ApiLogger.logResponse(options, data))
		);
	}

	///////////////////////////////
	//           Get             //
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
		// title for displaying in logs
		const options = apiOptions as WatchQueryOptions;
		options.variables = { id };
		options.query = QueryPool.getQuery(typename, QueryType.GET);
		return this.query(options, false);
	}

	/////////////////////////////
	//        QUERY MANY        //
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
		return this.query(options);
	}

	/////////////////////////////
	//        QUERY BY         //
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
		byTypename: Typename | 'Owner' = 'Team',
		byId?: string,
		apiOptions: ApiQueryOption = {}
	): ObservableQuery<T[]> {
		const options = apiOptions as WatchQueryOptions;
		options.variables = { byId };
		options.query = QueryPool.getQuery(typename, QueryType.LIST_BY, byTypename);
		return this.query(options);
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
		entity: T,
		apiOptions: ApiMutationOption = {}
	): Observable<T> {
		const options = apiOptions as MutationOptions;
		options.mutation = QueryPool.getQuery(typename, QueryType.CREATE);
		// TODO remove this condition when the audits are all similars
		if (typename !== 'Company' && typename !== 'Team') {
			entity.createdAt = Date.now();
			entity.lastUpdatedAt = Date.now();
			entity.deleted = false;
			entity.createdByUserId = this._userId;
			entity.lastUpdatedByUserId = this._userId;
			entity.teamId = this._teamId;
		}
		const variables = { input: { ...entity } };
		delete (variables.input as any).__typename;
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
	update<T>(typename: Typename, entity: T, apiOptions: ApiMutationOption = {}): Observable<T> {
		const options = apiOptions as MutationOptions;
		const queryName = GqlHelper.getQueryName(options.mutation);
		options.variables = { input: entity };
		options.mutation = QueryPool.getQuery(typename, QueryType.UPDATE);
		options.optimisticResponse = this.getOptimisticResponse(options, queryName, entity);
		return this.mutate(options);
	}

	/////////////////////////////
	//          DELETE         //
	/////////////////////////////

	delete<T>(typename: Typename, entity: T, apiOptions: ApiMutationOption = {}): Observable<T> {
		const options = apiOptions as MutationOptions;
		options.variables = { input: entity };
		options.mutation = QueryPool.getQuery(typename, QueryType.DELETE);
		return this.mutate(options);
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
	protected getOptimisticResponse(options: any, queryName: string, input: any) {
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

