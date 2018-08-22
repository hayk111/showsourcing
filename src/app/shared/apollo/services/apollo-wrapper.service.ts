import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FetchResult, DocumentNode } from 'apollo-link';
import { Observable, of, throwError, Subject, BehaviorSubject, ReplaySubject, combineLatest, forkJoin } from 'rxjs';
import { catchError, filter, first, map, shareReplay, tap, switchMap, take } from 'rxjs/operators';
import { log, LogColor } from '~utils';

import gql from 'graphql-tag';
import { RefetchParams } from '~shared/apollo/services/refetch.interface';
import { SelectParams } from '~global-services/_global/select-params';
import { Sort } from '~shared/table/components/sort.interface';
import { SelectListResult } from '~shared/apollo/interfaces/select-list-result.interface';
import { SelectParamsConfig } from '~global-services/_global/list-params';

interface WrapperInterface {
	selectOne: any;
	queryOne: any;
	selectOneByQuery: any;
	queryOneByQuery: any;
	selectMany: any;
	queryMany;
	getListQuery;
	waitForOne;
	update;
	updateMany;
	create;
	createMany;
	delete;
	deleteMany;
}

/**
 * Wrapper around apollo real client.
 * Enables CRUD operations and more on the back-end
 */
@Injectable({
	providedIn: 'root'
})
export class ApolloWrapper implements WrapperInterface {

	constructor(protected apollo: Apollo) { }

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
	 */
	selectOne(gql: DocumentNode, id: string) {
		const title = 'Selecting One';
		const queryName = this.getQueryName(gql);
		const variables = { query: `id == "${id}"` };
		this.log(title, gql, queryName, variables);

		// this uses a subscription under the hood which doesn't have the benefit of listening for value changes.
		// Therefor we will create a subject where we can push new changes to see those in the view in real time
		// since uuid are used for ids, it can be used as cacheKey
		if (this.selectOneCache.has(id))
			return this.selectOneCache.get(id).result;

		const obs = this.apollo.subscribe({ query: gql, variables })
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
	 */
	queryOne(gql: DocumentNode, id: string) {
		const queryName = this.getQueryName(gql);
		const variables = { query: `id == "${id}"` };
		const title = 'Query one';
		this.log(title, gql, queryName, variables);
		return this.apollo.watchQuery({ query: gql, variables }).valueChanges
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
	//   SELECT ONE BY QUERY     //
	///////////////////////////////

	/** Select one entity given a query,
	 * This is a subscription like all select, so it will listen to changes from all users.
	 * (subscription, NO optimistic UI)
	 */
	selectOneByQuery(gql: DocumentNode, query: string) {
		const title = 'Selecting One By Query';
		const queryName = this.getQueryName(gql);
		const variables = { query };
		this.log(title, gql, queryName, variables);
		return this.apollo.subscribe({ query: gql, variables })
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
	//   QUERY ONE BY QUERY     //
	///////////////////////////////

	/** Query one entity given a query,
	 * (Query, Optimistic UI)
	 */
	queryOneByQuery(gql: DocumentNode, query: string) {
		const title = 'Selecting One By Query';
		const queryName = this.getQueryName(gql);
		const variables = { query };
		this.log(title, gql, queryName, variables);
		return this.apollo.watchQuery({ query: gql, variables }).valueChanges
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

	/** @deprecated
	 * select many entities in accordance to the conditions supplied
	 * (subscription, NO Optimistic UI)
	*/
	selectMany(gql: DocumentNode, paramsConfig: SelectParamsConfig): Observable<any> {
		throw Error(`you probably don't want to use a subscription on many items (maybe queryMany, selectOne and waitForOne).
		If you know what you are doing, go ahead, remove this error and uncomment the code`);
		// const params = new SelectParams(paramsConfig);
		// const variables = params.toApolloVariables();
		// const queryName = this.getQueryName(gql);
		// const title = 'Selecting Many';
		// this.log(title, gql, queryName, variables);
		// return this.apollo.subscribe({ query: gql, variables })
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
	 */
	queryMany(gql: DocumentNode, paramsConfig: SelectParamsConfig): Observable<any> {
		const params = new SelectParams(paramsConfig);
		const variables = params.toApolloVariables();
		const queryName = this.getQueryName(gql);
		const title = 'Query Many';
		this.log(title, gql, queryName, variables);
		return this.apollo.watchQuery({ query: gql, variables }).valueChanges
			.pipe(
				filter((r: any) => this.checkError(r)),
				// extracting the result
				map((r) => r.data[queryName]),
				tap(data => this.logResult(title, queryName, data)),
				catchError(errors => of(log.table(errors)))
			);
	}


	/////////////////////////////
	//        QUERY LIST       //
	/////////////////////////////

	/** Query entities in accordance to the conditions supplied
	 * what is returned is a SelectListResult that allows us to do
	 * additional work after the query is done (like fetching more items for infini scroll)
	*/
	getListQuery<T>(gql: DocumentNode, paramsConfig: SelectParamsConfig): SelectListResult<T> {
		const queryName = this.getQueryName(gql);
		const params = new SelectParams(paramsConfig);

		// add query ref in case we need it.
		const queryRef = this.apollo.watchQuery<any>({
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
	*/
	selectAll(gql: DocumentNode): Observable<any> {
		throw Error(`You probably don't want to use a subscription on all items.
		If you know what you are doing, go ahead, remove this error and uncomment the code below`);
		// const queryName = this.getQueryName(gql);
		// this.log('Selecting All', gql, queryName);

		// return this.apollo.subscription({ query: gql })
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
	*/
	queryAll(gql: DocumentNode): Observable<any> {
		const queryName = this.getQueryName(gql);
		this.log('Selecting All', gql, queryName);

		return this.apollo.watchQuery({ query: gql }).valueChanges
			.pipe(
				// extracting the result
				map((r) => {
					if (!r.data)
						throwError(r.errors);
					return r.data[queryName];
				}),
				catchError(errors => of(log.table(errors))),
				tap(data => this.logResult('Selecting All', queryName, data)),
				shareReplay(1)
			);
	}


	/////////////////////////////
	//      WAIT FOR ONE       //
	/////////////////////////////

	/**
	 * waits for the first item to resolve
	 */
	waitForOne(gql: DocumentNode, query: string) {
		const title = 'Wait For One';
		const queryName = this.getQueryName(gql);
		const variables = { query };
		this.log(title, gql, queryName, variables);
		return this.apollo.subscribe({ query: gql, variables })
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

	/** Update one existing entity */
	update<T>(gql: DocumentNode, input: { id?: string }, typename?: string): Observable<FetchResult<T>> {
		const variables = { input };
		const queryName = this.getQueryName(gql);
		const options = { mutation: gql, variables };
		this.log('Update', gql, queryName, variables);

		this.addOptimisticResponse(options, gql, input, typename);

		// updating select one cache so changes are reflected when using selectOne(id)
		if (this.selectOneCache.has(input.id)) {
			this.selectOneCache.get(input.id).subj.next(input);
		}

		return this.apollo.mutate(options).pipe(
			first(),
			filter((r: any) => this.checkError(r)),
			map(({ data }) => data[queryName]),
			tap(data => this.logResult('Update', queryName, data)),
			catchError(errors => of(log.table(errors)))
		);
	}

	/////////////////////////////
	//       UPDATE MANY       //
	/////////////////////////////

	updateMany<T>(gql: DocumentNode, inputs: { id?: string }[], typename?: string): Observable<FetchResult<T>[]> {
		return forkJoin(inputs.map(input => this.update(gql, input, typename)));
	}

	/////////////////////////////
	//         CREATE          //
	/////////////////////////////

	/** Creates one entity */
	create<T>(gql: DocumentNode, input: { id?: string }, typename?: string): Observable<FetchResult<T>> {
		const variables = { input };
		const queryName = this.getQueryName(gql);
		this.log('Create', gql, queryName, variables);

		return this.apollo.mutate({ mutation: gql, variables }).pipe(
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
	createMany<T>(gql: DocumentNode, inputs: { id?: string }[], typename?: string): Observable<FetchResult<T>[]> {
		return forkJoin(inputs.map(input => this.create(gql, input, typename)));
	}

	/////////////////////////////
	//         DELETE          //
	/////////////////////////////

	/** Delete one item given an id */
	delete<T>(gql: DocumentNode, id: string): Observable<any> {

		const options = {
			mutation: gql,
			variables: { id }
		};
		const queryName = this.getQueryName(gql);
		this.log('DeleteOne', gql, queryName, options.variables);

		return this.apollo.mutate(options).pipe(
			first(),
			filter((r: any) => this.checkError(r)),
			map(({ data }) => data[queryName]),
			catchError(errors => of(log.table(errors)))
		);
	}


	/////////////////////////////
	//       DELETE MANY       //
	/////////////////////////////

	/** delete many items given an array of id */
	deleteMany<T>(gql: DocumentNode, ids: string[] = []): Observable<any> {
		if (ids.length === 0) {
			log.warn('trying to delete many items with an empty array of ids, aborting');
			return of(undefined);
		}

		let query = ids.map(id => `id = "${id}"`).join(' OR ');
		const apolloOptions = {
			mutation: gql,
			variables: { query },
		};
		const queryName = this.getQueryName(gql);
		this.log('DeleteMany', gql, queryName, apolloOptions.variables);

		return this.apollo.mutate(apolloOptions).pipe(
			first(),
			filter((r: any) => this.checkError(r)),
			map(({ data }) => data[queryName]),
			tap(({ data }) => this.logResult('DeleteMany', queryName, data)),
			catchError(errors => of(log.table(errors)))
		);
	}


	/////////////////////////////
	//          UTILS          //
	/////////////////////////////

	/** to use another named apollo client */
	use(name: string) {
		if (name)
			return new ApolloWrapper(this.apollo.use(name) as Apollo);
		else
			return this;
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
