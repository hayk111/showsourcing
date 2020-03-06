import { Injectable } from '@angular/core';
import { MutationOptions } from 'apollo-client';
import {
	ObservableQuery as ApolloObservableQuery,
	WatchQueryOptions
} from 'aws-appsync/node_modules/apollo-client';
import { DocumentNode } from 'graphql';
import { from, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Typename } from '../typename.type';
import { log } from '~utils/log';
import { LogColor } from '~utils/log-colors.enum';
import { QueryPool } from '../queries/query-pool.class';
import { QueryType } from '../queries/query-type.enum';
import { client } from './client';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { Entity } from '../models/_entity.model';
import { TeamService } from '~core/auth/services/team.service';

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
	private userId: string;

	constructor(private authSrv: AuthenticationService) {
		this.authSrv.signOut$.subscribe(_ => client.resetStore());
		this.authSrv.signIn$.subscribe(id => this.userId = id);
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
	queryOne<T>(
		typename: Typename,
		id: string,
		options: Partial<WatchQueryOptions> = {}
	): ObservableQuery<T> {
		// title for displaying in logs
		const title = 'Query one ' + typename;
		const { query, queryName, body } = QueryPool.getQueryInfo(typename, QueryType.QUERY_ONE);
		const variables = { id, ...options.variables };

		this.log(title, query, queryName, body, variables);
		const queryRef = client.watchQuery({
			query,
			...options,
			variables
		}) as ObservableQuery<any>;
		// attaching the data observable directly to the object
		const data$ = from(queryRef).pipe(
			// filter cache response when there is no cache
			filter(r => !r.stale),
			filter((r: any) => this.checkError(r, title)),
			// extracting the result
			map(({ data }) => data[queryName]),
			tap(data => this.logResult(title, queryName, data))
		);
		queryRef.data$ = data$;
		return queryRef;
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
	queryMany<T>(
		typename: Typename,
		variables: FilterParams,
		options: Partial<WatchQueryOptions> = {},
	): ObservableQuery<T[]> {
<<<<<<< HEAD
		const title = 'Query Many ' + typename + 's';
		const { query, queryName, body } = QueryPool.getQueryInfo(typename, queryType);
=======
		const title = 'Query Many ' + entityName + 's';
		const { query, queryName, body } = QueryPool.getQueryInfo(entityName, QueryType.QUERY_MANY);
>>>>>>> queryBy, must test the owner
		this.log(title, query, queryName, body, variables);

		const queryRef = client.watchQuery({
			query,
			variables,
			...options
		}) as ObservableQuery<any>;
		const data$ = from(queryRef).pipe(
			// filter cache response when there is no cache
			filter(r => !r.stale),
			filter((r: any) => this.checkError(r, title)),
			map(({ data }) => data[queryName].items),
			tap(data => this.logResult(title, queryName, data))
		);
		queryRef.data$ = data$;
		return queryRef;
	}

	/////////////////////////////
	//        QUERY ALL        //
	/////////////////////////////

	/**
	 * Query all entities
	 * (Query, optimistic UI)
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	 * @param options: Apollo options if we don't want the default
	 */
	queryAll<T>(
<<<<<<< HEAD
		typename: Typename,
		options: WatchQueryOptions | any = {},
		queryType: any = QueryType.QUERY_ALL
	): ObservableQuery<T[]> {
		const title = 'Query All ' + typename;
		const { query, queryName, body } = QueryPool.getQueryInfo(typename, queryType);
		const variables: any = options.variables;
=======
		entityName: EntityName,
		options: Partial<WatchQueryOptions> = {},
	): ObservableQuery<T[]> {
		const title = 'Query All ' + entityName;
		const { query, queryName, body } = QueryPool.getQueryInfo(entityName, QueryType.QUERY_ALL);
		const variables = options.variables;
>>>>>>> queryBy, must test the owner
		this.log(title, query, queryName, body);

		const queryRef = client.watchQuery({
			query,
			...options,
			variables
		}) as ObservableQuery<any>;
		const data$ = from(queryRef).pipe(
			// filter cache response when there is no cache
			filter(r => !r.stale),
			filter((r: any) => this.checkError(r, title)),
			map(({ data }) => data[queryName].items),
			tap(data => this.logResult(title, queryName, data))
		);

		queryRef.data$ = data$;
		return queryRef;
	}

	/////////////////////////////
	//        QUERY BY         //
	/////////////////////////////
	/**
	 * Query all entities by a referenced Entity (e.g: all teams that belongs to an user)
	 * (Query, optimistic UI)
	 * @param entityName: the name of the Entity we want to query
	 * @param byEntityName: the entity for wich the entityName will belongs to
	 * @param options: to override defaults variables, cache policies, ...
	 */
	queryBy<T>(
		entityName: EntityName,
		byEntityName: EntityName | 'Owner' = 'Team',
		options: Partial<WatchQueryOptions> = {}
	): ObservableQuery<T[]> {
		const { query, queryName, body } = QueryPool.getQueryInfo(entityName, QueryType.QUERY_BY, byEntityName);
		const variables = options.variables;
		const title = `Query All ${entityName} by ${byEntityName}`;
		this.log(title, query, queryName, body);

		const queryRef = client.watchQuery({
			query,
			...options,
			variables
		}) as ObservableQuery<any>;
		const data$ = from(queryRef).pipe(
			// filter cache response when there is no cache
			filter(r => !r.stale),
			filter((r: any) => this.checkError(r, title)),
			map(({ data }) => data[queryName].items),
			tap(data => this.logResult(title, queryName, data))
		);

		queryRef.data$ = data$;
		return queryRef;
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
			entity.createdByUserId = this.userId;
			entity.lastUpdatedByUserId = this.userId;
			entity.teamId = TeamService.teamSelected.id;
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
	update<T>(
		typename: Typename,
		entity: T,
		options: Partial<MutationOptions> = {}
	): Observable<T> {
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

<<<<<<< HEAD
	delete<T>(typename: Typename, entity: T, options: MutationOptions | {} = {}): Observable<T> {
		const title = 'Delete' + typename;
		const { query, queryName, body } = QueryPool.getQueryInfo(typename, QueryType.DELETE);
=======
	delete<T>(entityName: EntityName, entity: T, options: Partial<MutationOptions> = {}): Observable<T> {
		const title = 'Delete' + entityName;
		const { query, queryName, body } = QueryPool.getQueryInfo(entityName, QueryType.DELETE);
>>>>>>> queryBy, must test the owner
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
}

// TODO add the audits for create/update/delete

// TODO remove audits from the models => that way we can use new for update
