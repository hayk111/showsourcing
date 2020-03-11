import { Injectable } from '@angular/core';
import { MutationOptions } from 'apollo-client';
import {
	ObservableQuery as ApolloObservableQuery,
	WatchQueryOptions
} from 'aws-appsync/node_modules/apollo-client';
import { DocumentNode } from 'graphql';
import { from, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { log } from '~utils/log';
import { LogColor } from '~utils/log-colors.enum';
import { Entity } from '../models/_entity.model';
import { QueryPool } from '../queries/query-pool.class';
import { QueryType } from '../queries/query-type.enum';
import { Typename } from '../typename.type';
import { client } from './client';

export interface ObservableQuery<T = any> extends ApolloObservableQuery<T> {
	data$: Observable<T>;
}

export interface FilterParams {
	filter?: any;
	sort?: any;
	limit?: number;
	nextToken?: string;
}

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
	//        QUERY ONE          //
	///////////////////////////////

	/**
	 * Query one item by id, (query, optimistic UI)
	 * @param typename: name of the entity you are querying
	 * @param id: the id of the entity
	 * @param options: Apollo options if we don't want the default
	 */
	get<T>(
		typename: Typename,
		id: string,
		options: Partial<WatchQueryOptions> = {}
	): ObservableQuery<T> {
		// title for displaying in logs
		const variables = { id, ...options.variables };
		options.variables = variables;
		const title = `Query Get${typename}`;
		return this.queryHelper(typename, QueryType.GET, title, options, false);
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
	 * @param options: Apollo options if we don't want the default
	 */
	search<T>(
		typename: Typename,
		variables: FilterParams,
		options: Partial<WatchQueryOptions> = {}
	): ObservableQuery<T[]> {
		// title for displaying in logs
		const title = `Query Search${typename}s`;
		options.variables = variables;
		return this.queryHelper(typename, QueryType.SEARCH, title, options, true);
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
	 * @param options: to override defaults variables, cache policies, ...
	 */
	listBy<T>(
		typename: Typename,
		byTypename: Typename | 'Owner' = 'Team',
		byId?: string,
		options: Partial<WatchQueryOptions> = {}
	): ObservableQuery<T[]> {
		// title for displaying in logs
		const title = `Query List${typename}By${byTypename}`;
		const variables = { byId, ...options.variables };
		options.variables = variables;
		return this.queryHelper(typename, QueryType.LIST_BY, title, options, true, byTypename);
	}

	/////////////////////////////
	//         CREATE          //
	/////////////////////////////

	/** create one entity
	 * @param typename: name of the entity we want to create
	 * @param entity : entity we want to create
	 * @param options: Apollo options if we don't want the default
	 */
	create<T extends Entity>(
		typename: Typename,
		entity: T,
		options: Partial<MutationOptions> = {}
	): Observable<T> {
		const title = 'Create ' + typename;
		const { query, queryName, body } = QueryPool.getQueryInfo(typename, QueryType.CREATE);
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
		options = { mutation: query, variables, ...options };
		this.log(title, query, queryName, body, variables);
		return from(client.mutate({ mutation: query, variables, ...options })).pipe(
			map(({ data }) => data[queryName]),
			tap(data => this.logResult(title, queryName, data))
		);
	}

	/////////////////////////////
	//          UPDATE         //
	/////////////////////////////

	/** Update one entity
	 * @param typename: name of the entity we want to create
	 * @param entity : entity we want to create
	 * @param options: Apollo options if we don't want the default
	 */
	update<T>(typename: Typename, entity: T, options: Partial<MutationOptions> = {}): Observable<T> {
		const title = 'Update ' + typename;
		const { query, queryName, body } = QueryPool.getQueryInfo(typename, QueryType.UPDATE);
		const variables = { input: entity };
		options = { mutation: query, variables, ...options };
		this.addOptimisticResponse(options, queryName, entity);
		this.log(title, query, queryName, body, variables);

		return from(client.mutate(options as MutationOptions)).pipe(
			map(r => r[queryName].items),
			tap(data => this.logResult(title, queryName, data))
		);
	}

	/////////////////////////////
	//          DELETE         //
	/////////////////////////////

	delete<T>(typename: Typename, entity: T, options: Partial<MutationOptions> = {}): Observable<T> {
		const title = 'Delete' + typename;
		const { query, queryName, body } = QueryPool.getQueryInfo(typename, QueryType.DELETE);
		const variables = { input: entity };

		this.log(title, query, queryName, body, variables);

		return from(client.mutate({ mutation: query, variables, ...options })).pipe(
			map(r => r.data[queryName]),
			tap(data => this.logResult(title, queryName, data))
		);
	}

	/** creates an optimistic response the way apollo expects it */
	protected addOptimisticResponse(options: any, queryName: string, input: any) {
		if (input.__typename) {
			options.optimisticResponse = {
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

	/** logs request that is about to being made to the 	 */
	private log(type: string, gql: DocumentNode, queryName: string, body: string, variables?: any) {
		// logging for each request
		log.group(`%c 🍌 ${type}, queryName: ${queryName}`, LogColor.APOLLO_CLIENT_PRE);
		log.group(`%c trace`, LogColor.APOLLO_CLIENT_PRE);
		log.trace();
		log.groupEnd();
		log.debug(`%c queryName: ${queryName}`, LogColor.APOLLO_CLIENT_PRE);
		log.group(`%c gql`, 'color: fuchsia; background: #555555; padding: 4px');
		log.debug(`%c ${body}`, 'color: #555555');
		log.debug(gql);
		log.groupEnd();
		if (variables) {
			log.group(`%c variables`, 'color: lime; background: #555555; padding: 4px');
			log.table(variables);
			log.groupEnd();
		}
		log.groupEnd();
	}

	/** logs data received  */
	private logResult(type: string, queryName: string, result) {
		log.group(
			`%c 🍇 ${type} ${queryName} -- Result`,
			'color: pink; background: #555555; padding: 4px'
		);
		log.table(result);
		log.groupEnd();
	}

	/** log to debug, query and return correct datas */
	private queryHelper(
		typename: Typename,
		queryType: QueryType,
		title: string,
		options: Partial<WatchQueryOptions>,
		hasItems: boolean,
		byTypename?: Typename | 'Owner'
	) {
		const { query, queryName, body } = QueryPool.getQueryInfo(typename, queryType, byTypename);
		this.log(title, query, queryName, body, options.variables);

		const queryRef = client.watchQuery({
			query,
			...options
		}) as ObservableQuery<any>;
		const data$ = from(queryRef).pipe(
			// filter cache response when there is no cache
			filter(r => !r.stale),
			filter((r: any) => this.checkError(r, title)),
			map(({ data }) => hasItems ? data[queryName].items : data[queryName]),
			tap(data => this.logResult(title, queryName, data))
		);
		queryRef.data$ = data$;
		return queryRef;
	}


}

// TODO add the audits for update/delete
