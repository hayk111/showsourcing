import { ApolloBase } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { Observable, from, throwError, of } from 'rxjs';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { Entity } from '~core/erm/models';
import { ListQuery } from '~core/erm/services/_global/list-query.interface';
import { QueryBuilder } from '~core/erm/services/_global/query-builder.class';
import { SelectAllParamsConfig } from '~core/erm/services/_global/select-all-params';
import { SelectParamsConfig } from '~core/erm/services/_global/select-params';
import { log, LogColor } from '~utils';
import { API, graphqlOperation } from 'aws-amplify';
import { tap, filter, map, catchError, shareReplay } from 'rxjs/operators';


export interface GlobalServiceInterface<T> {
	selectOne: (id: string, fields?: string | string[]) => Observable<T>;
	queryOne: (id: string, fields?: string | string[]) => Observable<T>;
	selectOneByPredicate: (predicate: string, fields?: string | string[]) => Observable<T>;
	queryOneByPredicate: (predicate: string, fields?: string | string[]) => Observable<T>;
	selectMany: (paramsConfig: SelectParamsConfig, fields?: string | string[]) => Observable<T[]>;
	queryMany: (paramsConfig: SelectParamsConfig, fields?: string | string[]) => Observable<T[]>;
	queryCount: (predicate: string, client?: string) => Observable<number>;
	selectCount: (predicate: string, client?: string) => Observable<number>;
	getListQuery: (paramsConfig: SelectParamsConfig, fields?: string | string[]) => ListQuery<T>;
	waitForOne: (predicate: string, fields?: string | string[]) => Observable<T>;
	selectAll(fields?: string | string[], paramsConfig?: SelectAllParamsConfig): Observable<T[]>;
	queryAll(fields?: string | string[], paramsConfig?: SelectAllParamsConfig): Observable<T[]>;
	update: (entity: { id?: string }) => Observable<T>;
	updateMany: (entities: { id?: string }[]) => Observable<T[]>;
	create: (entity: T) => Observable<T>;
	createMany: (entities: T[]) => Observable<T[]>;
	delete: (id: string) => Observable<any>;
	deleteMany: (ids: string[]) => Observable<any>;
}


/**
 * Global service that other entity service can extend to do crud operations
 * and more over graphql
 */
export abstract class GlobalService<T extends Entity> implements GlobalServiceInterface<T> {

	/** the underlying graphql client this service is gonna use by default
	 * when none is specified
	 */
	protected queryBuilder: QueryBuilder;
	protected typeName: string;

	constructor(
		protected fields: any,
		protected sing: string,
		protected plural: string,
		protected analyticsSrv?: AnalyticsService
	) {
		this.queryBuilder = new QueryBuilder(sing, plural);
		// capitalizing the typename
		this.typeName = sing.substr(0, 1).toUpperCase() + sing.substr(1);
	}

	///////////////////////////////
	//        SELECT ONE         //
	///////////////////////////////

	// we use a cache so we can change things on update, without waiting for server response
	// this is because apollo doesn't have optimistic UI on subscriptions
	protected selectOneCache = new Map<string, { serverChanges, clientChanges, result }>();

	/** @deprecated select one entity given an id,
	 * This is a subscription like all select, so it will listen to changes from all users.
	 * This is the only subscription that has Optimistic UI as it uses our own underlying cache.
	 * (subscription, optimistic UI)
	 * @param id : id of the entity selected
	 * @param fields: the fields you want to query, if none is specified the default ones (TypeQueries.one) are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	 */
	selectOne(id: string, fields?: string | string[]): Observable<T> {
		throw Error('not implemented');
		// const title = 'Selecting One ' + this.typeName;
		// // fields will either be the ones given by fields, or if none is supplied it will take the one
		// // from TypeQuery.one
		// fields = this.getFields(fields, this.fields.one);
		// const gql = this.queryBuilder.selectOne(fields);
		// const queryName = this.getQueryName(gql);
		// const variables = { query: `id == "${id}"` };
		// const cacheKey = `${id}-${clientName}`;

		// // this uses a subscription under the hood which doesn't have the benefit of listening for value changes.
		// // Therefor we will create a subject where we can push new changes to see those in the view in real time
		// // since uuid are used for ids, it can be used as cacheKey
		// if (this.selectOneCache.has(cacheKey))
		// 	return this.selectOneCache.get(cacheKey).result;

		// // observable of the subscription
		// const serverChanges = this.getClient(clientName, title).pipe(
		// 	tap(_ => this.log(title, gql, queryName, clientName, variables)),
		// 	switchMap(client => client.subscribe({ query: gql, variables })),
		// 	filter((r: any) => this.checkError(r, title)),
		// 	// extracting the result
		// 	// since we are getting an array back we only need the first one
		// 	map(({ data }) => data[queryName].items[0]),
		// 	tap(data => this.logResult(title, queryName, data)),
		// 	shareReplay(1)
		// );
		// const clientChanges = new BehaviorSubject({});

		// const result = merge(
		// 	serverChanges,
		// 	clientChanges.pipe(
		// 		withLatestFrom(serverChanges),
		// 		map(([obs2Value, obs1Value]) => ({ ...obs1Value, ...obs2Value })),
		// 	)
		// );
		// this.selectOneCache.set(cacheKey, { serverChanges, clientChanges, result });
		// return result;
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
	queryOne(id: string, fields?: string | string[]): Observable<T> {
		throw Error('not implemented');
		// const title = 'Query one ' + this.typeName;
		// fields = this.getFields(fields, this.fields.one);
		// const gql = this.queryBuilder.queryOne(fields);
		// const queryName = this.getQueryName(gql);
		// const variables = { id };

		// return this.getClient(clientName, title).pipe(
		// 	tap(_ => this.log(title, gql, queryName, clientName, variables)),
		// 	switchMap(client => client.watchQuery({ query: gql, variables }).valueChanges),
		// 	filter((r: any) => this.checkError(r, title)),
		// 	// extracting the result
		// 	// since we are getting an array back we only need the first one
		// 	map(({ data }) => data[queryName]),
		// 	tap(data => this.logResult(title, queryName, data)),
		// 	shareReplay(1)
		// );
	}

	///////////////////////////////
	//  SELECT ONE BY PREDICATE  //
	///////////////////////////////

	/** @deprecated Select one entity given a query,
	 * This is a subscription like all select, so it will listen to changes from all users.
	 * (subscription, NO optimistic UI)
	 * @param predicate : string predicate / query to filter items
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	 */
	selectOneByPredicate(predicate: string, fields?: string | string[]): Observable<T> {
		throw Error('not implemented');
		// const title = 'Selecting One By Query ' + this.typeName;
		// fields = this.getFields(fields, this.fields.one);
		// const gql = this.queryBuilder.selectOne(fields);
		// const queryName = this.getQueryName(gql);
		// const variables = { query: predicate };

		// return this.getClient(clientName, title).pipe(
		// 	tap(_ => this.log(title, gql, queryName, clientName, variables)),
		// 	switchMap(client => client.subscribe({ query: gql, variables })),
		// 	filter((r: any) => this.checkError(r, title)),
		// 	// extracting the result
		// 	// since we are getting an array back we only need the first one
		// 	map(({ data }) => data[queryName].items[0]),
		// 	tap(data => this.logResult(title, queryName, data)),
		// 	shareReplay(1)
		// );
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
	queryOneByPredicate(predicate: string, fields?: string | string[]): Observable<T> {
		throw Error('not implemented');
		// const title = 'Querying One By Predicate ' + this.typeName;
		// fields = this.getFields(fields, this.fields.one);
		// const gql = this.queryBuilder.queryMany(fields);
		// const queryName = this.getQueryName(gql);
		// const variables = { query: predicate };

		// return this.getClient(clientName, title).pipe(
		// 	tap(_ => this.log(title, gql, queryName, clientName, variables)),
		// 	switchMap(client => client.watchQuery({ query: gql, variables }).valueChanges),
		// 	filter((r: any) => this.checkError(r, title)),
		// 	// extracting the result
		// 	// since we are getting an array back we only need the first one
		// 	map(({ data }) => data[queryName].items[0]),
		// 	tap(data => this.logResult(title, queryName, data)),
		// 	shareReplay(1)
		// );
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
	waitForOne(predicate: string, fields?: string | string[]): Observable<T> {
		throw Error('not implemented');
		// const title = 'Wait For One ' + this.typeName;
		// fields = this.getFields(fields, this.fields.one);
		// const gql = this.queryBuilder.selectOne(fields);
		// const queryName = this.getQueryName(gql);
		// const variables = { query: predicate };

		// return this.getClient(clientName, title).pipe(
		// 	tap(_ => this.log(title, gql, queryName, clientName, variables)),
		// 	switchMap(client => client.subscribe({ query: gql, variables })),
		// 	filter((r: any) => this.checkError(r, title)),
		// 	// extracting the result
		// 	// since we are getting an array back we only need the first one
		// 	map(({ data }) => data[queryName].items[0]),
		// 	// we are only interested when there is an item
		// 	filter(item => !!item),
		// 	first(),
		// 	tap(data => this.logResult(title, queryName, data)),
		// 	shareReplay(1)
		// );
	}


	/////////////////////////////
	//       SELECT MANY       //
	/////////////////////////////

	/**
	 * @deprecated select many entities given selection parameters
	 * (subscription, NO Optimistic UI)
	 * @param params : SelectParamsConfig to specify what slice of data we are querying
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	selectMany(paramsConfig: SelectParamsConfig, fields?: string | string[]): Observable<T[]> {
		throw Error('not implemented');
		// const title = 'Selecting Many ' + this.typeName;
		// fields = this.getFields(fields, this.fields.many);
		// const gql = this.queryBuilder.selectMany(fields);
		// const variables = new SelectParams(paramsConfig);
		// const queryName = this.getQueryName(gql);

		// return this.getClient(clientName, title).pipe(
		// 	tap(_ => this.log(title, gql, queryName, clientName, variables)),
		// 	switchMap(client => client.subscribe({ query: gql, variables })),
		// 	filter((r: any) => this.checkError(r, title)),
		// 	// extracting the result
		// 	map((r) => r.data[queryName].items),
		// 	tap(data => this.logResult(title, queryName, data)),
		// 	catchError(errors => of(log.table(errors)))
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
	queryMany(paramsConfig: SelectParamsConfig, fields?: string | string[]): Observable<T[]> {
		throw Error('not implemented');

		// const title = 'Query Many ' + this.typeName;
		// fields = this.getFields(fields, this.fields.many);
		// const gql = this.queryBuilder.queryMany(fields);
		// const variables = new SelectParams(paramsConfig);
		// const queryName = this.getQueryName(gql);

		// return this.getClient(clientName, title).pipe(
		// 	tap(_ => this.log(title, gql, queryName, clientName, variables)),
		// 	switchMap(client => client.watchQuery({ query: gql, variables }).valueChanges),
		// 	filter((r: any) => this.checkError(r, title)),
		// 	// extracting the result
		// 	map((r) => r.data[queryName].items),
		// 	tap(data => this.logResult(title, queryName, data)),
		// 	catchError(errors => of(log.table(errors)))
		// );
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
	getListQuery(paramsConfig: SelectParamsConfig, fields?: string | string[])
		: ListQuery<T> {
		throw Error('not implemented');

		// const title = 'Query List';
		// fields = this.getFields(fields, this.fields.many);
		// const gql = this.queryBuilder.queryMany(fields);
		// const queryName = this.getQueryName(gql);
		// const variables = new SelectParams(paramsConfig);


		// // get query ref
		// const queryRef$: Observable<QueryRef<any>> = this.getClient(clientName, title).pipe(
		// 	map(client => client.watchQuery<any>({
		// 		query: gql,
		// 		variables
		// 	})),
		// 	shareReplay(1)
		// );

		// let itemsAmount = 0;

		// const data$ = queryRef$.pipe(
		// 	tap(_ => this.log(title, gql, queryName, clientName, variables)),
		// 	switchMap(queryRef => queryRef.valueChanges),
		// 	distinctUntilChanged(),
		// 	filter((r: any) => this.checkError(r, title)),
		// 	map(r => r.data[queryName])
		// );

		// const count$ = data$.pipe(
		// 	map(data => data.count)
		// );

		// // add items$ wich are the actual items requested
		// const items$: ConnectableObservable<T[]> = data$.pipe(
		// 	map(data => data.items),
		// 	tap(data => this.logResult(title, queryName, data)),
		// 	tap(data => itemsAmount = data.length),
		// 	catchError((errors) => of(log.table(errors))),
		// 	publishReplay(1)
		// ) as ConnectableObservable<T[]>;

		// // add fetchMore so we can tell apollo to fetch more items ( infiniScroll )
		// // (will be reflected in items$)
		// const fetchMore = (): Observable<any> => {
		// 	const fetchMoreTitle = 'Selecting List Fetch More ' + this.typeName;
		// 	return queryRef$.pipe(
		// 		tap(_ => this.log(fetchMoreTitle, gql, queryName, clientName, { skip: itemsAmount })),
		// 		map(queryRef => queryRef.fetchMore({
		// 			variables: { skip: itemsAmount },
		// 			updateQuery: (prev, { fetchMoreResult }) => {
		// 				if (!fetchMoreResult[queryName]) {
		// 					return prev;
		// 				}
		// 				this.logResult(fetchMoreTitle, queryName, fetchMoreResult[queryName].items);
		// 				// extracting data from response
		// 				return {
		// 					[queryName]: {
		// 						items: [
		// 							...prev[queryName].items,
		// 							...fetchMoreResult[queryName].items
		// 						],
		// 						count: fetchMoreResult[queryName].count,
		// 						__typename: prev[queryName].__typename
		// 					},
		// 				};
		// 			}
		// 		})));
		// };

		// // add refetch query so we can tell apollo to that the variables have changed
		// // (will be reflected in items$)
		// const refetch = (config: SelectParamsConfig): Observable<any> => {
		// 	const refetchTitle = 'Selecting List Refetch' + this.typeName;
		// 	return queryRef$.pipe(
		// 		tap(_ => this.log(refetchTitle, gql, queryName, clientName, config)),
		// 		tap(queryRef => queryRef.setOptions({ fetchPolicy: 'network-only' })),
		// 		switchMap(queryRef => queryRef.refetch({ ...config }))
		// 	);
		// };

		// return { queryName, items$, count$, fetchMore, refetch };
	}

	/////////////////////////////
	//       SELECT ALL        //
	/////////////////////////////

	/**
	 * select all entities
	 * (Subscription, NO optimistic UI)
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	selectAll(fields?: string | string[], paramsConfig?: SelectAllParamsConfig): Observable<T[]> {
		throw Error('not implemented');
		// const title = 'Select All ' + this.typeName;
		// fields = this.getFields(fields, this.fields.all);
		// const gql = this.queryBuilder.selectAll(fields);
		// const queryName = this.getQueryName(gql);
		// const variables = new SelectAllParams(paramsConfig);

		// return this.getClient(clientName, title).pipe(
		// 	tap(_ => this.log(title, gql, queryName, clientName)),
		// 	switchMap(client => client.subscribe({ query: gql, variables })),
		// 	// extracting the result
		// 	map((r: any) => {
		// 		if (!r.data)
		// 			throwError(r.errors);
		// 		return r.data[queryName].items;
		// 	}),
		// 	catchError(errors => of(log.table(errors))),
		// 	tap(data => this.logResult(title, queryName, data)),
		// 	shareReplay(1)
		// );
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
	queryAll(fields?: string | string[], paramsConfig?: SelectAllParamsConfig): Observable<T[]> {
		const title = 'Query All ' + this.typeName;
		fields = this.getFields(fields, this.fields.all);
		const query = this.queryBuilder.queryAll(fields);
		const queryName = this.getQueryName(query);

		// const variables = new SelectAllParams(paramsConfig);
		this.log(title, query, queryName);
		return from(
			API.graphql({ query, variables: {} })
		).pipe(
			// extracting the result
			map((r) => r.data[queryName].items),
			tap(data => this.logResult(title, queryName, data)),
			catchError(data => {
				data.errors.forEach(e => log.error(e));
				of(log.table(data.errors));
				return of(null);
			}),
			shareReplay(1)
		) as Observable<any>;

		// return this.getClient(clientName, title).pipe(
		// 	tap(_ => this.log(title, gql, queryName, clientName, variables)),
		// 	switchMap(client => client.watchQuery({ query: gql, variables }).valueChanges),
		// 	filter((r: any) => this.checkError(r, title)),
		// 	// extracting the result
		// 	map((r) => {
		// 		if (!r.data)
		// 			throwError(r.errors);
		// 		return r.data[queryName].items;
		// 	}),
		// 	catchError(errors => of(log.table(errors))),
		// 	tap(data => this.logResult(title, queryName, data)),
		// 	shareReplay(1)
		// );
	}

	/////////////////////////////
	//       QUERY COUNT       //
	/////////////////////////////
	/**
	 * waits for the first item to resolve
	 * @param predicate : string  realm predicate / query to filter items
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	queryCount(predicate: string): Observable<number> {
		throw Error('not implemented');
		// const title = 'Query Count ' + this.typeName;
		// const gql = this.queryBuilder.queryCount();
		// const queryName = this.getQueryName(gql);
		// const variables = { query: predicate };

		// return this.getClient(clientName, title).pipe(
		// 	tap(_ => this.log(title, gql, queryName, clientName, variables)),
		// 	switchMap(client => client.watchQuery({ query: gql, variables }).valueChanges),
		// 	filter((r: any) => this.checkError(r, title)),
		// 	// extracting the result
		// 	map((r) => {
		// 		if (!r.data)
		// 			throwError(r.errors);
		// 		return r.data[queryName].count;
		// 	}),
		// 	catchError(errors => of(log.table(errors))),
		// 	tap(data => this.logResult(title, queryName, data)),
		// 	shareReplay(1)
		// );
	}


	/////////////////////////////
	//       SELECT COUNT       //
	/////////////////////////////
	/**
	 * @deprecated waits for the first item to resolve
	 * @param predicate : string  realm predicate / query to filter items
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	selectCount(predicate: string): Observable<number> {
		throw Error('not implemented');
		// const title = 'Select Count ' + this.typeName;
		// const gql = this.queryBuilder.selectCount();
		// const queryName = this.getQueryName(gql);
		// const variables = { query: predicate };

		// return this.getClient(clientName, title).pipe(
		// 	tap(_ => this.log(title, gql, queryName, clientName, variables)),
		// 	switchMap(client => client.subscribe({ query: gql, variables })),
		// 	// extracting the result
		// 	map((r) => {
		// 		if (!r.data)
		// 			throwError(r.errors);
		// 		return r.data[queryName].count;
		// 	}),
		// 	catchError(errors => of(log.table(errors))),
		// 	tap(data => this.logResult(title, queryName, data)),
		// 	shareReplay(1)
		// );
	}

	/////////////////////////////
	//          UPDATE         //
	/////////////////////////////

	/** Update one existing entity
	 *
	 * @param entity : entity with an id and the fields we want to update
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	update(entity: T, fields?: string, isOptimistic: boolean = true): Observable<T> {
		throw Error('not implemented');
		// const title = 'Update ' + this.typeName;
		// fields = fields ? fields : this.patch(entity);
		// const gql = this.queryBuilder.update(fields);
		// const variables = { input: entity };
		// const queryName = this.getQueryName(gql);
		// const options = { mutation: gql, variables };
		// const cacheKey = `${entity.id}-${clientName}`;

		// if (isOptimistic) {
		// 	this.addOptimisticResponse(options, gql, entity, this.typeName);
		// }
		// // updating select one cache so changes are reflected when using selectOne(id)
		// if (this.selectOneCache.has(cacheKey) && isOptimistic) {
		// 	this.selectOneCache.get(cacheKey).clientChanges.next(entity);
		// }

		// return this.getClient(clientName, title).pipe(
		// 	tap(_ => this.log(title, gql, queryName, clientName, variables)),
		// 	switchMap(client => client.mutate(options)),
		// 	filter((r: any) => this.checkError(r, title)),
		// 	map(({ data }) => data[queryName]),
		// 	tap(data => this.logResult(title, queryName, data)),
		// 	tap(data => this.sendTrack('Update', data, 'update', fields)),
		// 	first(),
		// 	catchError(errors => of(log.table(errors)))
		// );
	}

	/////////////////////////////
	//       UPDATE MANY       //
	/////////////////////////////

	/** Update many existing entities
	 *
	 * @param entities : array of entity with an id and the fields we want to update
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	updateMany(entities: T[], fields?: string): Observable<T[]> {
		throw Error('not implemented');

		// const title = 'Update many' + this.typeName;
		// fields = fields ? fields : this.patch(entities[0]);
		// const gql = this.queryBuilder.updateMany(fields);
		// const variables = { input: entities };
		// const queryName = this.getQueryName(gql);
		// const options = { mutation: gql, variables };

		// // if (isOptimistic) {
		// // 	this.addOptimisticResponse(options, gql, entity, this.typeName);
		// // }

		// return this.getClient(clientName, title).pipe(
		// 	tap(_ => this.log(title, gql, queryName, clientName, variables)),
		// 	switchMap(client => client.mutate(options)),
		// 	first(),
		// 	filter((r: any) => this.checkError(r, title)),
		// 	map(({ data }) => data[queryName]),
		// 	tap(data => this.logResult(title, queryName, data)),
		// 	tap(data => this.sendTrack('Update many', data, 'update', fields)),
		// 	catchError(errors => of(log.table(errors)))
		// );
	}


	/////////////////////////////
	//         CREATE          //
	/////////////////////////////

	/** create one entity
	 * @param entity : entity with an id and the fields we want to create
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	create(entity: T): Observable<T> {
		const title = 'Create one ' + this.typeName;
		const fields = this.patch(entity);
		const query = this.queryBuilder.create(fields);
		const variables = { input: entity };
		const queryName = this.getQueryName(query);

		this.log(title, query, queryName, variables);
		return from(
			API.graphql({ query, variables })
		).pipe(
			// extracting the result
			map((r) => r.data[queryName].items),
			tap(data => this.logResult(title, queryName, data)),
			catchError(data => {
				data.errors.forEach(e => log.error(e));
				of(log.table(data.errors));
				return of(null);
			}),
		);

		// return this.getClient(clientName, title).pipe(
		// 	tap(_ => this.log(title, gql, queryName, clientName, variables)),
		// 	switchMap(client => client.mutate({ mutation: gql, variables })),
		// 	first(),
		// 	filter((r: any) => this.checkError(r, title)),
		// 	map(({ data }) => data[queryName]),
		// 	tap(data => this.logResult(title, queryName, data)),
		// 	tap(data => this.sendTrack('Create', data, 'creation')),
		// 	catchError(errors => of(log.table(errors)))
		// );
	}


	/////////////////////////////
	//       CREATE MANY       //
	/////////////////////////////
	/** create many entities
	 * @param entity : entity with an id and the fields we want to create
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	createMany(entities: T[]): Observable<T[]> {
		throw Error('not implemented');

		// return forkJoin(entities.map(entity => this.create(entity, clientName)));
	}

	/////////////////////////////
	//         DELETE          //
	/////////////////////////////

	/** Delete one item given an id
	 * @param id : id of the entity to delete
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	delete(id: string): Observable<any> {
		throw Error('not implemented');

		// const title = 'Delete one ' + this.typeName;
		// const gql = this.queryBuilder.deleteOne();
		// const options = {
		// 	mutation: gql,
		// 	variables: { id }
		// };
		// const queryName = this.getQueryName(gql);

		// return this.getClient(clientName, title).pipe(
		// 	tap(_ => this.log(title, gql, queryName, clientName, options.variables)),
		// 	switchMap(client => client.mutate(options)),
		// 	first(),
		// 	filter((r: any) => this.checkError(r, title)),
		// 	map(({ data }) => data[queryName]),
		// 	catchError(errors => of(log.table(errors)))
		// );
	}


	/////////////////////////////
	//       DELETE MANY       //
	/////////////////////////////

	/** Delete many items given an id
	 * @param id : id of the entity to delete
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	deleteMany(ids: string[]): Observable<any> {
		throw Error('not implemented');

		// // // checking we received ids, because if no query is specified
		// // // apollo will delete everything
		// if (ids.length === 0) {
		// 	log.warn('trying to delete many items with an empty array of ids, aborting');
		// 	return of(undefined);
		// }

		// const title = 'Delete many ' + this.typeName;
		// const gql = this.queryBuilder.deleteMany();
		// const query = ids.map(id => `id == "${id}"`).join(' OR ');
		// const options = {
		// 	mutation: gql,
		// 	variables: { query }
		// };
		// const queryName = this.getQueryName(gql);

		// return this.getClient(clientName, title).pipe(
		// 	tap(_ => this.log(title, gql, queryName, clientName, options.variables)),
		// 	switchMap(client => client.mutate(options)),
		// 	first(),
		// 	filter((r: any) => this.checkError(r, title)),
		// 	map(({ data }) => data[queryName]),
		// 	catchError(errors => of(log.table(errors)))
		// );
	}


	/////////////////////////////
	//          UTILS          //
	/////////////////////////////

	// when updating an entity with sub entities we only need
	// the id of the sub entities.
	// for example when we change the supplier of a product we just need the id of the supplier
	// else we could override things
	protected strip(entity: any) {
		const striped = {};
		Object.entries(entity).forEach(([k, v]) => {
			const value = entity[k];
			if (Array.isArray(value) && value.length > 0 && value[0].id) {
				striped[k] = value.map(item => ({ id: item.id }));
			} else if (value instanceof Object && value.id) {
				striped[k] = { id: value.id };
			} else {
				striped[k] = value;
			}
		});
		return striped;
	}

	/** to use another named apollo client */
	protected getClient(context: string): Observable<ApolloBase> {
		throw Error('not implemented');
		// return this.apolloState.getClientWhenReady(clientName, context);
	}

	/** creates an optimistic response the way apollo expects it */
	protected addOptimisticResponse(options: any, gql: DocumentNode, input, typename: string) {
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
	protected getQueryName(gql: DocumentNode): string {
		try {
			return (gql.definitions[0] as any).selectionSet.selections[0].name.value;
		} catch (e) {
			throw Error('query name not found in apollo client');
		}
	}

	/** gets the content of a graphql query */
	protected getQueryBody(gql: DocumentNode): string {
		return gql.loc.source.body;
	}

	/** logs request that is about to being made to the 	 */
	protected log(type: string, gql: DocumentNode, queryName: string, variables?: any) {
		// logging for each request
		log.group(`%c 🍌 ${type}, queryName: ${queryName}`, LogColor.APOLLO_CLIENT_PRE);
		log.group(`%c trace`, LogColor.APOLLO_CLIENT_PRE);
		log.trace();
		log.groupEnd();
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
	protected logResult(type: string, queryName: string, result) {
		log.group(`%c 🍇 ${type} ${queryName} -- Result`, 'color: pink; background: #555555; padding: 4px');
		log.table(result);
		log.groupEnd();
	}

	/** @deprecated amplify makes the check i think
	 *  check if a graphql call has given any error */
	protected checkError(r: { data: any, errors: any[], loading: boolean }, title: string) {
		if (r.errors) {
			r.errors.forEach(e => log.error(e));
			return false;
		} else if (r.loading) {
			return false;
		} else if (!r.data) {
			log.error(`No data, there must be something wrong with the query "${title}", here is the response`);
			log.debug(r);
			return false;
		}
		return true;
	}

	protected getFields(fields: string | string[], defaultFields: string) {
		if (!fields || fields.length === 0)
			return defaultFields;
		if (Array.isArray(fields))
			return fields.join(',');
		return fields;
	}

	// transform an entity into a set of gql fields that can be
	// used in a request
	patch(a: any): string {
		const keys = Object.keys(a);
		// removing the typename property
		const patchedParts = keys.filter(key => key !== '__typename')
			// transforming fields of entity into gql update obj
			.map(key => this.patchProp(key, a));
		return patchedParts.join(' ');
	}

	patchProp(key, obj) {
		const val = obj[key];
		if (Array.isArray(val)) {
			if (val.length > 0) {
				if (val[0] instanceof Object) {
					// take fields of last elements (so when we add new comment etc)
					return `${key} { ${this.patch(val[val.length - 1])} }`;
				} else {
					return key;
				}
			} else {
				return this.emptyArrayExceptions(key);
			}
		} else if (val instanceof Object) {
			return `${key} { ${this.patch(val)} }`;
		} else if (val === null) {
			return '';
		} else {
			return key;
		}
	}

	private emptyArrayExceptions(key: string) {
		switch (key) {
			case 'votes':
				return 'votes { id }';
			case 'projects':
				return 'projects { id }';
			default:
				return '';
		}
	}

	/** @deprecated */
	sendTrack(action: string, data: any, type: string, fields = '') {
		if (this.analyticsSrv) {
			this.analyticsSrv.eventTrack(action, {
				id: action,
				id_element: data.id,
				name: data.name,
				entity: this.typeName,
				date: data.creationDate,
				type,
				fields
			});
		}
	}
}


