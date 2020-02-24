import { ObservableQuery as ApolloObservableQuery, WatchQueryOptions } from 'aws-appsync/node_modules/apollo-client';
import { DocumentNode } from 'graphql';
import { from, Observable } from 'rxjs';
import { filter, map, shareReplay, tap } from 'rxjs/operators';
import { EntityName } from '~core/erm/models';
import { log } from '~utils/log';
import { LogColor } from '~utils/log-colors.enum';
import { queryMap } from '../queries/_queries.map';
import { client } from './client';
import { QueryType } from '../queries/_query-type.enum';

export interface ObservableQuery<T = any> extends ApolloObservableQuery<T> {
	data$: Observable<T>;
}

export interface ApiServiceInterface {
	queryOne<T>(entityName: EntityName | string, id: string, options: WatchQueryOptions | {}): ObservableQuery<T>;
	queryAll<T>(entityName: EntityName | string, options: WatchQueryOptions | {}): ObservableQuery<T[]>;
}

/**
 * service to do crud operations on entities
 */
export abstract class ApiService {

	protected teamId: string;

	///////////////////////////////
	//        QUERY ONE          //
	///////////////////////////////

	/**
	 * Query one item by id, (query, optimistic UI)
	 * @param entityName: name of the entity you are querying
	 * @param id: the id of the entity
	 */
	queryOne<T>(entityName: EntityName | string, id: string, options: WatchQueryOptions | {} = {}): ObservableQuery<T> {
		// title for displaying in logs
		const title = 'Query one ' + entityName;
		const { query, queryName, body } = queryMap[entityName].getQueryInfo(QueryType.QUERY_ONE);
		const variables = { id, teamId: this.teamId };

		this.log(title, query, queryName, body, variables);
		const queryRef = client.watchQuery({ query, variables, ...options }) as ObservableQuery<any>;
		// attaching the data observable directly to the object
		const data$ = from(queryRef).pipe(
			filter((r: any) => this.checkError(r, title)),
			// extracting the result
			map(({ data }) => data[queryName]),
			tap(data => this.logResult(title, queryName, data)),
			shareReplay(1)
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
	*/
	queryAll<T>(entityName: EntityName | string, options: WatchQueryOptions | {} = {}): ObservableQuery<T[]> {
		const title = 'Query All ' + entityName;
		const { query, queryName, body } = queryMap[entityName].getQueryInfo(QueryType.QUERY_ALL);
		const variables: any = { teamId: this.teamId };
		this.log(title, query, queryName, body);

		const queryRef = client.watchQuery({ query, variables, ...options }) as ObservableQuery<any>;
		const data$ = from(queryRef).pipe(
			filter((r: any) => this.checkError(r, title)),
			map(({ data }) => data[queryName]),
			tap(data => this.logResult(title, queryName, data)),
			shareReplay(1)
		);

		queryRef.data$ = data$;
		return queryRef;
	}

	/** check if a graphql call has given any error */
	protected checkError(r: { data: any, errors: any[], loading: boolean }, title: string) {
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
		log.group(`%c 🍇 ${type} ${queryName} -- Result`, 'color: pink; background: #555555; padding: 4px');
		log.table(result);
		log.groupEnd();
	}


}


