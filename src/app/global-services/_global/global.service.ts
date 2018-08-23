import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, filter, first, map, shareReplay, tap } from 'rxjs/operators';
import { GlobalQuery } from '~global-services/_global/global.query.interface';
import { SelectParams, SelectParamsConfig } from '~global-services/_global/select-params';
import { log, LogColor } from '~utils';
import { FetchResult } from 'apollo-link';
import { ListQuery } from '~global-services/_global/list-query.interface';



export interface GlobalServiceInterface<T> {
	selectOne: (id: string, fields?: string, client?: string) => Observable<T>;
	queryOne: (id: string, fields?: string, client?: string) => Observable<T>
	selectOneByPredicate: (predicate: string, fields?: string, client?: string) => Observable<T>;
	queryOneByPredicate: (predicate: string, fields?: string, client?: string) => Observable<T>;
	selectMany: (paramsConfig: SelectParamsConfig, fields?: string, client?: string) => Observable<T[]>;
	queryMany: (paramsConfig: SelectParamsConfig, fields?: string, client?: string) => Observable<T[]>;
	getListQuery: (paramsConfig: SelectParamsConfig, fields?: string, client?: string) => ListQuery<T>
	waitForOne: (predicate: string, fields?: string, client?: string) => Observable<T>;
	update: (entity: { id?: string }, fields?: string, client?: string) => Observable<FetchResult<T>>;
	updateMany: (entities: { id?: string }[], fields?: string, client?: string) => Observable<FetchResult<T>[]>;
	create: (entity: T, fields?: string, client?: string) => Observable<FetchResult<T>>;
	createMany: (entities: T[], fields?: string, client?: string) => Observable<FetchResult<T>[]>;
	delete: (id: string, client?: string) => Observable<any>;
	deleteMany: (ids: string[], client?: string) => Observable<any>;
}


/**
 * Global service that other entity service can extend to do crud operations
 * and more over graphql
 */
export abstract class GlobalService<T extends { id?: string }> implements GlobalServiceInterface<T> {

	defaultClient: string;

	constructor(
		protected apollo: Apollo,
		protected queries: GlobalQuery,
		protected typeName?: string
	) { }

	///////////////////////////////
	//        SELECT ONE         //
	///////////////////////////////

	// we use a cache so we can change things on update, without waiting for server response
	// this is because apollo doesn't have optimistic UI on subscriptions
	private selectOneCache = new Map<string, { subj, obs, result }>();

	/** select one entity given an id,
	 * This is a subscription like all select, so it will listen to changes from all users.
	 * This is the only subscription that has Optimistic UI as it uses our own underlying cache.
	 * (subscription, optimistic UI)
	 * @param id : id of the entity selected
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	 */
	selectOne(id: string, fields?: string, client: string = this.defaultClient): Observable<T> {
		const title = 'Selecting One ' + this.typeName;
		const gql = this.queries.selectOne(fields);
		const queryName = this.getQueryName(gql);
		const variables = { query: `id == "${id}"` };
		this.log(title, gql, queryName, variables);

		// this uses a subscription under the hood which doesn't have the benefit of listening for value changes.
		// Therefor we will create a subject where we can push new changes to see those in the view in real time
		// since uuid are used for ids, it can be used as cacheKey
		if (this.selectOneCache.has(id))
			return this.selectOneCache.get(id).result;

		const obs = this.getClient(client).subscribe({ query: gql, variables })
			.pipe(
				filter((r: any) => this.checkError(r)),
				// extracting the result
				// since we are getting an array back we only need the first one
				map(({ data }) => data[queryName][0]),
				tap(data => this.logResult(title, queryName, data)),
				shareReplay(1)
			);
		const subj = new BehaviorSubject({});
		const result = combineLatest(obs, subj, (latestChanges, newestChanges) => ({ ...latestChanges, ...newestChanges }));
		this.selectOneCache.set(id, { subj, obs, result });
		return result;
	}

	///////////////////////////////
	//        QUERY ONE          //
	///////////////////////////////

	/**
	 * Query one item by id, (query, optimistic UI)
	 * @param id : id of the entity selected
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	 */
	queryOne(id: string, fields?: string, client: string = this.defaultClient): Observable<T> {
		const title = 'Query one ' + this.typeName;
		const gql = this.queries.queryOne(fields);
		const queryName = this.getQueryName(gql);
		const variables = { query: `id == "${id}"` };
		this.log(title, gql, queryName, variables);
		return this.getClient(client).watchQuery({ query: gql, variables }).valueChanges
			.pipe(
				filter((r: any) => this.checkError(r)),
				// extracting the result
				// since we are getting an array back we only need the first one
				map(({ data }) => data[queryName][0]),
				tap(data => this.logResult(title, queryName, data)),
				shareReplay(1)
			);
	}

	///////////////////////////////
	//  SELECT ONE BY PREDICATE  //
	///////////////////////////////

	/** Select one entity given a query,
	 * This is a subscription like all select, so it will listen to changes from all users.
	 * (subscription, NO optimistic UI)
	 * @param predicate : string predicate / query to filter items
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	 */
	selectOneByPredicate(predicate: string, fields?: string, client: string = this.defaultClient): Observable<T> {
		const title = 'Selecting One By Query ' + this.typeName;
		const gql = this.queries.selectOne(fields);
		const queryName = this.getQueryName(gql);
		const variables = { query: predicate };
		this.log(title, gql, queryName, variables);
		return this.getClient(client).subscribe({ query: gql, variables })
			.pipe(
				filter((r: any) => this.checkError(r)),
				// extracting the result
				// since we are getting an array back we only need the first one
				map(({ data }) => data[queryName][0]),
				tap(data => this.logResult(title, queryName, data)),
				shareReplay(1)
			);
	}

	///////////////////////////////
	//   QUERY ONE BY PREDICATE  //
	///////////////////////////////

	/** Query one entity given a query,
	 * (Query, Optimistic UI)
	 * @param predicate : string  realm predicate / query to filter items
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	 */
	queryOneByPredicate(predicate: string, fields?: string, client: string = this.defaultClient): Observable<T> {
		const title = 'Selecting One By Query ' + this.typeName;
		const gql = this.queries.queryOne(fields);
		const queryName = this.getQueryName(gql);
		const variables = { query: predicate };
		this.log(title, gql, queryName, variables);
		return this.getClient(client).watchQuery({ query: gql, variables }).valueChanges
			.pipe(
				filter((r: any) => this.checkError(r)),
				// extracting the result
				// since we are getting an array back we only need the first one
				map(({ data }) => data[queryName][0]),
				tap(data => this.logResult(title, queryName, data)),
				shareReplay(1)
			);
	}


	/////////////////////////////
	//       SELECT MANY       //
	/////////////////////////////

	/**
	 * select many entities given selection parameters
	 * (subscription, NO Optimistic UI)
	 * @param params : SelectParamsConfig to specify what slice of data we are querying
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	selectMany(paramsConfig: SelectParamsConfig, fields?: string, client = this.defaultClient): Observable<T[]> {
		throw Error(`you probably don't want to use a subscription on many items (maybe queryMany, selectOne and waitForOne).
		If you know what you are doing, go ahead, remove this error and uncomment the code`);
		// const params = new SelectParams(paramsConfig);
		// const variables = params.toApolloVariables();
		// const queryName = this.getQueryName(gql);
		// const title = 'Selecting Many';
		// this.log(title, gql, queryName, variables);
		// return this.getClient(client).subscribe({ query: gql, variables })
		// 	.pipe(
		// 		filter((r: any) => this.checkError(r)),
		// 		// extracting the result
		// 		map((r) => r.data[queryName]),
		// 		tap(data => this.logResult(title, queryName, data)),
		// 		catchError(errors => of(log.table(errors)))
		// );
	}

	/////////////////////////////
	//       QUERY MANY        //
	/////////////////////////////

	/** Query many entities given selection parameters,
	 * (Query, Optimistic UI)
	 * @param params : SelectParamsConfig to specify what slice of data we are querying
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	queryMany(paramsConfig: SelectParamsConfig, fields?: string, client = this.defaultClient): Observable<T[]> {
		const title = 'Query Many ' + this.typeName;
		const gql = this.queries.queryMany(fields);
		const params = new SelectParams(paramsConfig);
		const variables = params.toApolloVariables();
		const queryName = this.getQueryName(gql);

		this.log(title, gql, queryName, variables);

		return this.getClient(client).watchQuery({ query: gql, variables }).valueChanges
			.pipe(
				filter((r: any) => this.checkError(r)),
				// extracting the result
				map((r) => r.data[queryName]),
				tap(data => this.logResult(title, queryName, data)),
				catchError(errors => of(log.table(errors)))
			);
	}

	/////////////////////////////
	//      GET LIST QUERY     //
	/////////////////////////////

	/** Query entities in accordance to the conditions supplied
	 * what is returned is a SelectListResult that allows us to do
	 * additional work after the query is done (like fetching more items for infini scroll)
	 * @param params : SelectParamsConfig to specify what slice of data we are querying
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	 * @returns ListQuery that items$ and also allows you to fetchMore and refetch
	*/
	getListQuery(paramsConfig: SelectParamsConfig, fields?: string, client = this.defaultClient): ListQuery<T> {
		const gql = this.queries.queryMany(fields)
		const queryName = this.getQueryName(gql);
		const params = new SelectParams(paramsConfig);

		// add query ref in case we need it.
		const queryRef = this.getClient(client).watchQuery<any>({
			query: gql,
			variables: { ...params.toApolloVariables() },
		});

		// add items$ wich are the actual items requested
		const items$: Observable<T[]> = queryRef.valueChanges.pipe(
			filter((r: any) => this.checkError(r)),
			// extracting the result
			map((r) => r.data[queryName]),
			tap(data => this.logResult('Selecting List', queryName, data)),
			catchError((errors) => of(log.table(errors)))
		);

		// add fetchMore so we can tell apollo to fetch more items ( infiniScroll )
		// (will be reflected in items$)
		const fetchMore = (skip: number) => queryRef.fetchMore({
			variables: { ...params, skip },
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult[queryName]) { return prev; }
				this.logResult('Selecting List Fetch More', queryName, fetchMoreResult.data)
				return Object.assign({}, prev, {
					[queryName]: [...prev[queryName], ...fetchMoreResult[queryName]],
				});
			}
		});

		// add refetch query so we can tell apollo to that the variables have changed
		// (will be reflected in items$)
		const refetch = (paramsConfig: SelectParamsConfig) => {
			const params = new SelectParams(paramsConfig);
			queryRef.refetch(params.toApolloVariables());
		}

		return { queryName, queryRef, items$, fetchMore, refetch };
	}

	/////////////////////////////
	//       SELECT ALL        //
	/////////////////////////////

	/** @deprecated
	 * select all entities
	 * (Subscription, NO optimistic UI)
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	selectAll(fields?: string, client?: string): Observable<T[]> {
		throw Error(`You probably don't want to use a subscription on all items.
		If you know what you are doing, go ahead, remove this error and uncomment the code below`);
		// const queryName = this.getQueryName(gql);
		// this.log('Selecting All', gql, queryName);

		// return this.getClient(client).subscription({ query: gql })
		// 	.pipe(
		// 		// extracting the result
		// 		map((r) => {
		// 			if (!r.data)
		// 				throwError(r.errors);
		// 			return r.data[queryName];
		// 		}),
		// 		catchError(errors => of(log.table(errors))),
		// 		tap(data => this.logResult('Selecting All', queryName, data)),
		// 		shareReplay(1)
		// 	);
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
	queryAll(fields?: string, client?: string): Observable<any> {
		const title = 'Selecting All ' + this.typeName;
		const gql = this.queries.queryAll(fields);
		const queryName = this.getQueryName(gql);
		this.log(title, gql, queryName);

		return this.getClient(client).watchQuery({ query: gql }).valueChanges
			.pipe(
				// extracting the result
				map((r) => {
					if (!r.data)
						throwError(r.errors);
					return r.data[queryName];
				}),
				catchError(errors => of(log.table(errors))),
				tap(data => this.logResult(title, queryName, data)),
				shareReplay(1)
			);
	}


	/////////////////////////////
	//      WAIT FOR ONE       //
	/////////////////////////////

	/**
	 * waits for the first item to resolve
	 * @param predicate : string  realm predicate / query to filter items
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	waitForOne(predicate: string, fields?: string, client?: string) {
		const title = 'Wait For One ' + this.typeName;
		const gql = this.queries.selectOne(fields);
		const queryName = this.getQueryName(gql);
		const variables = { query: predicate };
		this.log(title, gql, queryName, variables);
		return this.getClient(client).subscribe({ query: gql, variables })
			.pipe(
				filter((r: any) => this.checkError(r)),
				// extracting the result
				// since we are getting an array back we only need the first one
				map(({ data }) => data[queryName][0]),
				// we are only interested when there is an item
				filter(item => !!item),
				first(),
				tap(data => this.logResult(title, queryName, data)),
				shareReplay(1)
			);
	}


	/////////////////////////////
	//          UPDATE         //
	/////////////////////////////

	/** Update one existing entity
	 *
	 * @param entity : entity with an id and the fields we want to update
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	update(entity: { id?: string }, fields?: string, client: string = this.defaultClient): Observable<FetchResult<T>> {
		const title = 'Update ' + this.typeName;
		const gql = this.queries.update(fields);
		const variables = { input: entity };
		const queryName = this.getQueryName(gql);
		const options = { mutation: gql, variables };
		this.log(title, gql, queryName, variables);

		this.addOptimisticResponse(options, gql, entity, this.typeName);

		// updating select one cache so changes are reflected when using selectOne(id)
		if (this.selectOneCache.has(entity.id)) {
			this.selectOneCache.get(entity.id).subj.next(entity);
		}

		return this.getClient(client).mutate(options).pipe(
			first(),
			filter((r: any) => this.checkError(r)),
			map(({ data }) => data[queryName]),
			tap(data => this.logResult(title, queryName, data)),
			catchError(errors => of(log.table(errors)))
		);
	}

	/////////////////////////////
	//       UPDATE MANY       //
	/////////////////////////////

	/** Update many existing entities
	 *
	 * @param entities : array of entity with an id and the fields we want to update
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	updateMany(entities: { id?: string }[], fields?: string, client: string = this.defaultClient): Observable<FetchResult<T>[]> {
		return forkJoin(entities.map(entity => this.update(entity, fields, client)));
	}


	/////////////////////////////
	//         CREATE          //
	/////////////////////////////

	/** create one entity
	 * @param entity : entity with an id and the fields we want to create
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	create(entity: T, fields?: string, client?: string = this.defaultClient): Observable<FetchResult<T>> {
		const title = 'Create one ' + this.typeName;
		const gql = this.queries.create(fields);
		const variables = { input: entity };
		const queryName = this.getQueryName(gql);
		this.log('Create', gql, queryName, variables);

		return this.getClient(client).mutate({ mutation: gql, variables }).pipe(
			first(),
			filter((r: any) => this.checkError(r)),
			map(({ data }) => data[queryName]),
			tap(data => this.logResult('Create', queryName, data)),
			catchError(errors => of(log.table(errors)))
		);
	}


	/////////////////////////////
	//       CREATE MANY       //
	/////////////////////////////
	/** create many entities
	 * @param entity : entity with an id and the fields we want to create
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	createMany(entities: T[], fields?: string, client?: string = this.defaultClient): Observable<FetchResult<T>[]> {
		return forkJoin(entities.map(entity => this.create(entity, fields, client)));
	}

	/////////////////////////////
	//         DELETE          //
	/////////////////////////////

	/** Delete one item given an id
	 * @param id : id of the entity to delete
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	delete(id: string, client = this.defaultClient): Observable<any> {
		const title = 'Delete one ' + this.typeName;
		const gql = this.queries.deleteOne();
		const options = {
			mutation: gql,
			variables: { id }
		};
		const queryName = this.getQueryName(gql);
		this.log(title, gql, queryName, options.variables);

		return this.getClient(client).mutate(options).pipe(
			first(),
			filter((r: any) => this.checkError(r)),
			map(({ data }) => data[queryName]),
			catchError(errors => of(log.table(errors)))
		);
	}


	/////////////////////////////
	//       DELETE MANY       //
	/////////////////////////////

	/** Delete many items given an id
	 * @param id : id of the entity to delete
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	deleteMany(ids: string[], client = this.defaultClient): Observable<any> {

		throw Error(`There is no use case for delete many at the moment.
If you know what you are doing you can remove this error and
uncomment the code below. Delete many is dangerous, because there is a risk of
Deleting everything.. so watchout. `);
		// // checking we received ids, because if no query is specified
		// // apollo will delete everything
		// if (ids.length === 0) {
		// 	log.warn('trying to delete many items with an empty array of ids, aborting');
		// 	return of(undefined);
		// }

		// const title = 'Delete Many ' + this.typeName;
		// const gql = this.queries.deleteMany();
		// const query = ids.map(id => `id = "${id}"`).join(' OR ');
		// const apolloOptions = {
		// 	mutation: gql,
		// 	variables: { query },
		// };
		// const queryName = this.getQueryName(gql);
		// this.log('DeleteMany', gql, queryName, apolloOptions.variables);

		// return this.getClient(client).mutate(apolloOptions).pipe(
		// 	first(),
		// 	filter((r: any) => this.checkError(r)),
		// 	map(({ data }) => data[queryName]),
		// 	tap(({ data }) => this.logResult('DeleteMany', queryName, data)),
		// 	catchError(errors => of(log.table(errors)))
		// );
	}

	/////////////////////////////
	//          UTILS          //
	/////////////////////////////

	/** to use another named apollo client */
	getClient(clientName: string) {
		if (name)
			return this.apollo.use(clientName);
		else
			return this.apollo;
	}

	/** create appollo mutationOptions from our updateOptions */
	private createApolloMutationOptions(gql: DocumentNode, input: any) {
		return {
			mutation: gql,
			variables: { input },
		};
	}

	/** creates an optimistic response the way apollo expects it */
	private addOptimisticResponse(options: any, gql: DocumentNode, input, typename: string) {
		if (typename) {
			options.optimisticResponse = {
				__typename: 'Mutation',
				[this.getQueryName(gql)]: {
					...input,
					__typename: typename
				},
			};
		} else {
			log.warn(`Doing a mutation without optimistic ui: ${this.getQueryName(gql)}`);
		}
	}

	/** gets the query name from a gql statement */
	private getQueryName(gql: DocumentNode): string {
		try {
			return (gql.definitions[0] as any).selectionSet.selections[0].name.value;
		} catch (e) {
			throw Error('query name not found in apollo client');
		}
	}

	/** gets the content of a graphql query */
	private getQueryBody(gql: DocumentNode): string {
		return gql.loc.source.body;
	}

	/** logs events to the console */
	private log(type: string, gql: DocumentNode, queryName: string, variables?: any) {
		// logging for each request
		log.group(`%c ${type}, queryName: ${queryName}`, LogColor.APOLLO_CLIENT_PRE);
		log.debug(`%c queryName: ${queryName}`, LogColor.APOLLO_CLIENT_PRE);
		log.group(`%c gql`, 'color: fuchsia; background: #555555; padding: 4px');
		log.debug(`%c ${this.getQueryBody(gql)}`, 'color: #555555');
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
		log.group(`%c ${type} ${queryName} -- Result`, 'color: pink; background: #555555; padding: 4px');
		log.table(result);
		log.groupEnd();
	}

	/** check if a graphql call has given any error */
	private checkError(r: { data: any, errors: any[] }) {
		if (r.errors) {
			r.errors.forEach(e => log.error(e));
			return false;
		} else if (!r.data) {
			log.error('No data, there must be something wrong with the query, here is the response');
			log.debug(r);
			return false;
		}
		return true;
	}

}


