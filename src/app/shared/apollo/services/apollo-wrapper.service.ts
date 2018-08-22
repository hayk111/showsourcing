import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FetchResult, DocumentNode } from 'apollo-link';
import { Observable, of, throwError, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { catchError, filter, first, map, shareReplay, tap, switchMap, take } from 'rxjs/operators';
import { log, LogColor } from '~utils';

import gql from 'graphql-tag';
import { RefetchParams } from '~shared/apollo/services/refetch.interface';
import { SelectParams } from '~global-services/_global/select-params';
import { Sort } from '~shared/table/components/sort.interface';
import { SelectListResult } from '~shared/apollo/interfaces/select-list-result.interface';
import { SelectParamsConfig } from '~global-services/_global/list-params';



/**
 * Wrapper around apollo real client.
 * This class is complicated but relieve other parts of the app from any complexity
 */
@Injectable({
	providedIn: 'root'
})
export class ApolloWrapper {

	constructor(protected apollo: Apollo) { }


	///////////////////////////////
	//   SELECT ONE SECTION      //
	///////////////////////////////

	/** select one entity given an id */

	selectOne(gql: DocumentNode, id: string) {
		const queryName = this.getQueryName(gql);
		const variables = { query: `id == "${id}"` };
		this.log('Selecting One', gql, queryName, variables);
		return this.apollo.subscribe({ query: gql, variables })
			.pipe(
				filter((r: any) => this.checkError(r)),
				// extracting the result
				// since we are getting an array back we only need the first one
				map(({ data }) => data[queryName][0]),
				tap(data => this.logResult('SelectOne', queryName, data)),
				shareReplay(1)
			);
	}


	/////////////////////////////
	//   SELECT MANY SECTION   //
	/////////////////////////////

	/** select many entities in accordance to the conditions supplied */
	selectMany(gql: DocumentNode, paramsConfig: SelectParamsConfig): Observable<any> {
		const params = new SelectParams(paramsConfig);
		const variables = params.toApolloVariables();
		const queryName = this.getQueryName(gql);
		this.log('Selecting Many', gql, queryName, variables);
		return this.apollo.subscribe({ query: gql, variables })
			.pipe(
				filter((r: any) => this.checkError(r)),
				// extracting the result
				map((r) => r.data[queryName]),
				tap(data => this.logResult('Selecting Many', queryName, data)),
				catchError(errors => of(log.table(errors))),
		);
	}


	/////////////////////////////
	//        QUERY LIST       //
	/////////////////////////////

	/** select entities in accordance to the conditions supplied
	 * what is returned is a SelectListResult that allows us to do
	 * additional work after the query is done (like fetching more items for infini scroll)
	*/
	queryList<T>(gql: DocumentNode, paramsConfig: SelectParamsConfig): SelectListResult<T> {
		const queryName = this.getQueryName(gql);
		const params = new SelectParams(paramsConfig);
		const queryRef = this.apollo.watchQuery<any>({
			query: gql,
			variables: { ...params.toApolloVariables() },
		});

		const items$: Observable<T[]> = queryRef.valueChanges.pipe(
			filter((r: any) => this.checkError(r)),
			// extracting the result
			map((r) => r.data[queryName]),
			tap(data => this.logResult('Selecting List', queryName, data)),
			catchError((errors) => of(log.table(errors)))
		);

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

		const refetch = (paramsConfig: SelectParamsConfig) => {
			const params = new SelectParams(paramsConfig);
			queryRef.refetch(params.toApolloVariables());
		}

		return { queryName, queryRef, items$, fetchMore, refetch };
	}

	/////////////////////////////
	//   SELECT ALL SECTION    //
	/////////////////////////////

	/** select all entities given the query */
	selectAll(gql: DocumentNode): Observable<any> {
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

	/** Update one existing entity */
	update<T>(gql: DocumentNode, input: { id?: string }, typename?: string): Observable<FetchResult<T>> {
		const variables = { input };
		const queryName = this.getQueryName(gql);
		const options = { mutation: gql, variables };
		this.log('Update', gql, queryName, variables);

		this.addOptimisticResponse(options, gql, input, typename);

		return this.apollo.mutate(options).pipe(
			first(),
			filter((r: any) => this.checkError(r)),
			map(({ data }) => data[queryName]),
			tap(data => this.logResult('Update', queryName, data)),
			catchError(errors => of(log.table(errors)))
		);
	}

	/** Creates one entity */
	create<T>(gql: DocumentNode, input: { id?: string }, typename?: string, refetchQueries?: RefetchParams[]): Observable<FetchResult<T>> {
		const variables = { input };
		const queryName = this.getQueryName(gql);
		this.log('Create', gql, queryName, variables);

		return this.apollo.mutate({ mutation: gql, variables, refetchQueries }).pipe(
			first(),
			filter((r: any) => this.checkError(r)),
			map(({ data }) => data[queryName]),
			tap(data => this.logResult('Create', queryName, data)),
			catchError(errors => of(log.table(errors)))
		);
	}

	/** Delete one item given an id */
	delete<T>(gql: DocumentNode, id: string, refetchQueries: RefetchParams[]): Observable<any> {

		// first we gotta create the refetchQuery
		// then we can actually delete, and the refetch query will be executed
		const options = {
			mutation: gql,
			variables: { id },
			refetchQueries
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

	/** delete many items given an array of id */
	deleteMany<T>(gql: DocumentNode, ids: string[] = [], refetchQueries?: RefetchParams[]): Observable<any> {
		if (ids.length === 0) {
			log.warn('trying to delete many items with an empty array of ids, aborting');
			return of(undefined);
		}

		let query = ids.map(id => `id = "${id}"`).join(' OR ');
		const apolloOptions = {
			mutation: gql,
			variables: { query },
			refetchQueries
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

	private logResult(type: string, queryName: string, result) {
		log.group(`%c ${type} ${queryName} -- Result`, 'color: pink; background: #555555; padding: 4px');
		log.table(result);
		log.groupEnd();
	}

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
