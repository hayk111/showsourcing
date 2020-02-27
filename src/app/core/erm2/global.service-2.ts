import { DocumentNode } from 'graphql';
import { ConnectableObservable, forkJoin, from, Observable, of } from 'rxjs';
import { catchError, filter, first, map, publishReplay, shareReplay, tap } from 'rxjs/operators';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { Entity } from '~core/erm/models';
import { ListQuery } from '~core/erm/services/_global/list-query.interface';
import { CustomQueries, QueryBuilder } from '~core/erm/services/_global/query-builder-2.class';
import { SelectAllParamsConfig } from '~core/erm/services/_global/select-all-params';
import { SelectParamsConfig, SelectParams } from '~core/erm/services/_global/select-params-2.class';
import { log, LogColor } from '~utils';

declare const client: any;


/**
 * Global service that other entity service can extend to do crud operations
 * and more over graphql
 */
export abstract class GlobalService<T extends Entity> {

	/** the underlying graphql client this service is gonna use by default
	 * when none is specified
	 */
	protected queryBuilder: QueryBuilder;
	protected typeName: string;
	protected listQuery: any;
	protected static teamId: string;
	protected useTeamId = true;

	constructor(
		protected fields: any,
		protected sing: string,
		protected customQueries?: CustomQueries,
		protected analyticsSrv?: AnalyticsService
	) {
		this.queryBuilder = new QueryBuilder(sing, customQueries);
		// capitalizing the typename
		this.typeName = sing.substr(0, 1).toUpperCase() + sing.substr(1);
	}

	///////////////////////////////
	//        SELECT ONE         //
	///////////////////////////////

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
		// const queryName = this.queryBuilder.getQueryName(gql);
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
		// title for displaying in logs
		const title = 'Query one ' + this.typeName;
		// the fields that we need, if not specified in the parameters we take the default ones
		fields = this.getFields(fields, this.fields.one);
		// generate the graphql query
		const query = this.queryBuilder.queryOne(fields);
		// extracting the name of the graphql query for logging etc
		const queryName = this.queryBuilder.getQueryName(query);
		const variables = { id };

		this.log(title, query, queryName, variables);
		return from(client.watchQuery({ query, variables })).pipe(
			filter((r: any) => this.checkError(r, title)),
			// extracting the result
			// since we are getting an array back we only need the first one
			map(({ data }) => data[queryName]),
			tap(data => this.logResult(title, queryName, data)),
			shareReplay(1)
		);
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
		// const queryName = this.queryBuilder.getQueryName(gql);
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
		// const queryName = this.queryBuilder.getQueryName(gql);
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
		const title = 'Query Many ' + this.typeName;
		fields = this.getFields(fields, this.fields.many);
		const query = this.queryBuilder.queryMany(fields);
		const variables = (new SelectParams(paramsConfig)).toAppSyncVariables();
		const queryName = this.queryBuilder.getQueryName(query);
		this.log(title, query, queryName, variables);

		return from(client.watchQuery({ query, variables })).pipe(
			filter((r: any) => this.checkError(r, title)),
			// extracting the result
			map((r) => r.data[queryName].items),
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
	getListQuery(paramsConfig: SelectParamsConfig, fields?: string | string[])
		: ListQuery<T> {
		const title = 'Query List';
		fields = this.getFields(fields, this.fields.many);
		const query = this.queryBuilder.queryMany(fields);
		const queryName = this.queryBuilder.getQueryName(query);
		const variables = new SelectParams(paramsConfig);

		const queryRef = client.watchQuery({ query, variables});
		let nextToken: string;


		const data$ = from(queryRef).pipe(
			tap(_ => this.log(title, query, queryName, variables)),
			filter((r: any) => this.checkError(r, title)),
			map(r => r.data[queryName]),
			tap(d => nextToken = d.nextToken)
		);

		const count$ = data$.pipe(
			map(data => data.total)
		);

		// add items$ wich are the actual items requested
		const items$: ConnectableObservable<T[]> = data$.pipe(
			map(data => data.items),
			tap(data => this.logResult(title, queryName, data)),
			catchError((errors) => of(log.table(errors))),
			publishReplay(1)
		) as ConnectableObservable<T[]>;

		// add fetchMore so we can tell apollo to fetch more items ( infiniScroll )
		// (will be reflected in items$)
		const fetchMore = () => {
			const fetchMoreTitle = 'Get List Fetch More ' + this.typeName;
			this.log(fetchMoreTitle, query, queryName, { nextToken });
			return from(queryRef.fetchMore({
				variables: { nextToken },
				updateQuery: (prev, { fetchMoreResult }) => {
					return {
						[queryName]: {
							items: [
								...prev[queryName].items,
								...fetchMoreResult[queryName].items
							],
							total: fetchMoreResult[queryName].total,
							__typename: prev[queryName].__typename
						},
					} as any;
				}
				// updateQuery: (prev, { fetchMoreResult }) => {
				// 	if (!fetchMoreResult[queryName]) {
				// 		return prev;
				// 	}
				// 	this.logResult(fetchMoreTitle, queryName, fetchMoreResult[queryName].items);
				// 	// extracting data from response
				// 	return {
				// 		[queryName]: {
				// 			items: [
				// 				...prev[queryName].items,
				// 				...fetchMoreResult[queryName].items
				// 			],
				// 			count: fetchMoreResult[queryName].count,
				// 			__typename: prev[queryName].__typename
				// 		},
				// 	};
				// }
			}));
		};

		// add refetch query so we can tell apollo to that the variables have changed
		// (will be reflected in items$)
		const refetch = (config: SelectParamsConfig): Observable<any> => {
			const refetchTitle = 'Get List Refetch' + this.typeName;
			return from(queryRef.refetch());
		};

		return { queryName, items$, count$, fetchMore, refetch };
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
		const queryName = this.queryBuilder.getQueryName(query);
		const variables: any = { };
		if (this.useTeamId) {
			variables.teamId = GlobalService.teamId;
		}

		// const variables = new SelectAllParams(paramsConfig);
		this.log(title, query, queryName);
		return from(client.watchQuery({ query, variables })).pipe(
			// extracting the result
			map((r: any) => r.data[queryName].items),
			tap(data => this.logResult(title, queryName, data)),
			catchError(data => {
				data.errors.forEach(e => log.error(e));
				of(log.table(data.errors));
				return of(null);
			}),
			shareReplay(1)
		) as Observable<any>;
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
		// const queryName = this.queryBuilder.getQueryName(gql);
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
	}

	/////////////////////////////
	//          UPDATE         //
	/////////////////////////////

	/** Update one existing entity
	 *
	 * @param entity : entity with an id and the fields we want to update
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	update(entity: T, fields?: string): Observable<T> {
		const title = 'Update ' + this.typeName;
		fields = fields ? fields : this.patch(entity);
		const mutation = this.queryBuilder.update(fields);
		const variables = { input: entity };
		const queryName = this.queryBuilder.getQueryName(mutation);
		const options = { mutation, variables };

		this.addOptimisticResponse(options, mutation, entity, this.typeName);
		this.log(title, mutation, queryName, variables);
		return from(client.mutate(options)).pipe(
			filter((r: any) => this.checkError(r, title)),
			map(({ data }) => data[queryName]),
			tap(data => this.logResult(title, queryName, data)),
			tap(data => this.sendTrack('Update', data, 'update', fields)),
			first(),
			catchError(errors => of(log.table(errors)))
		);
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
		// const queryName = this.queryBuilder.getQueryName(gql);
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
		const mutation = this.queryBuilder.create(fields);
		const variables = { input: entity };
		const queryName = this.queryBuilder.getQueryName(mutation);

		this.log(title, mutation, queryName, variables);

		return from(client.mutate({ mutation, variables }))
		.pipe(
			// extracting the result
			map((r: any) => r.data[queryName]),
			tap(data => this.logResult(title, queryName, data)),
			catchError(data => {
				data.errors.forEach(e => log.error(e));
				of(log.table(data.errors));
				return of(null);
			}),
		);
	}


	/////////////////////////////
	//       CREATE MANY       //
	/////////////////////////////
	/** create many entities
	 * @param entity : entity with an id and the fields we want to create
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	createMany(entities: T[]): Observable<T[]> {
		return forkJoin(entities.map(entity => this.create(entity)));
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
		// const queryName = this.queryBuilder.getQueryName(gql);

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
		// const queryName = this.queryBuilder.getQueryName(gql);

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

	/** creates an optimistic response the way apollo expects it */
	protected addOptimisticResponse(options: any, gql: DocumentNode, input, typename: string) {
		if (typename) {
			options.optimisticResponse = {
				__typename: 'Mutation',
				[this.queryBuilder.getQueryName(gql)]: {
					...input,
					__typename: typename
				},
			};
		} else {
			log.warn(`Doing a mutation without optimistic ui: ${this.queryBuilder.getQueryName(gql)}`);
		}
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
		log.debug(`%c ${this.queryBuilder.getQueryBody(gql)}`, 'color: #555555');
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


