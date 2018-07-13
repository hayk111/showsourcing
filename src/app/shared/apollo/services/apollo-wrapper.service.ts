import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FetchResult } from 'apollo-link';
import { Observable, of, throwError } from 'rxjs';
import { catchError, filter, first, map, shareReplay, tap } from 'rxjs/operators';
import { DeleteManyOptions, DeleteOneOptions } from '~shared/apollo/interfaces/delete-options.interface';
import { SubribeToOneOptions, SubscribeToManyOptions } from '~shared/apollo/interfaces/subscription-option.interface';
import { log, LogColor } from '~utils';

import { UpdateOptions } from '../interfaces/update-options.interface';


/**
 * Wrapper around apollo real client.
 * This class is complicated but relieve other parts of the app from any complexity
 */
@Injectable({
	providedIn: 'root'
})
export class ApolloWrapper {
	private selectOneCache = new Map();
	private selectAllCache = new Map();

	constructor(protected apollo: Apollo) { }

	/**
	 * @deprecated it will be removed soon
	 */
	query<T>(options: any): any {
		log.error('query method is deprecated, do not use it !!!!');
		return this.apollo.watchQuery<T>(options);
	}

	///////////////////////////////
	//   SELECT ONE SECTION      //
	///////////////////////////////

	/** select one entity given an id */
	selectOne(options: SubribeToOneOptions) {
		const queryName = this.getQueryName(options);
		const cacheKey = `${options.id}-${queryName}`;
		const variables = { query: `id == "${options.id}"` };
		this.log('Selecting One', options, queryName, variables);

		if (!this.selectOneCache.has(cacheKey)) {
			this.selectOneCache.set(cacheKey, this.selectOnePipe(options, queryName, variables));
		}
		return this.selectOneCache.get(cacheKey);
	}

	selectOnePipe(options: SubribeToOneOptions, queryName: string, variables: any) {
		return this.apollo.subscribe({ query: options.gql, variables })
			.pipe(
				filter((r) => this.checkError(r)),
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

	// we don't have a cache for this one as it changes all the time

	/** select many entities in accordance to the conditions supplied */
	selectMany(options: SubscribeToManyOptions): Observable<any> {
		const { gql, ...variables } = options;
		const queryName = this.getQueryName(options);
		this.log('Selecting Many', options, queryName, variables);
		return this.apollo.subscribe({ query: gql, variables })
			.pipe(
				filter((r) => this.checkError(r)),
				// extracting the result
				map((r) => r.data[queryName]),
				tap(data => this.logResult('Selecting Many', queryName, data)),
				catchError(errors => of(log.table(errors))),
		);
	}

	/////////////////////////////
	//   SELECT ALL SECTION    //
	/////////////////////////////

	/** select all entities given the query */
	selectAll(options: SubscribeToManyOptions): Observable<any> {
		const { gql } = options;
		const queryName = this.getQueryName(options);
		// we can use the query body for the cacheKey since there are no vars
		const cacheKey = this.getQueryBody(options);
		this.log('Selecting All', options, queryName);
		if (!this.selectAllCache.has(cacheKey)) {
			this.selectAllCache.set(cacheKey, this.selectAllPipe(gql, queryName));
		}
		return this.selectAllCache.get(cacheKey);
	}

	selectAllPipe(gql: any, queryName: string) {
		return this.apollo.subscribe({ query: gql })
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

	/** Update one existing entity*/
	update<T>(options: UpdateOptions): Observable<FetchResult<T>> {
		const apolloOptions = this.createApolloMutationOptions(options);
		const queryName = this.getQueryName(options);
		this.log('Update', options, queryName, apolloOptions.variables);

		if (this.checkNonOptimistic(options)) {
			return this.apollo.mutate(apolloOptions).pipe(
				first(),
				filter((r: any) => this.checkError(r)),
				map(({ data }) => data[queryName]),
				tap(data => this.logResult('Update', queryName, data)),
				catchError(errors => of(log.table(errors)))
			);
		}

		this.addOptimisticResponse(options);
		return this.apollo.mutate<T>(apolloOptions).pipe(
			first(),
			filter((r: any) => this.checkError(r)),
			map(({ data }) => data[queryName]),
			tap(data => this.logResult('Update', queryName, data)),
			catchError(errors => of(log.table(errors)))
		);
	}

	/** Creates one entity */
	create<T>(options: UpdateOptions): Observable<FetchResult<T>> {
		const apolloOptions = this.createApolloMutationOptions(options);
		const queryName = this.getQueryName(options);
		this.log('Create', options, queryName, apolloOptions.variables);

		if (this.checkNonOptimistic(options)) {
			return this.apollo.mutate(apolloOptions).pipe(
				first(),
				filter((r: any) => this.checkError(r)),
				map(({ data }) => data[queryName]),
				tap(data => this.logResult('Create', queryName, data)),
				catchError(errors => of(log.table(errors)))
			);
		}
		// TODO implement optimistic UI
		return this.apollo.mutate(apolloOptions).pipe(
			first(),
			filter((r: any) => this.checkError(r)),
			map(({ data }) => data[queryName]),
			tap(data => this.logResult('Create', queryName, data)),
			catchError(errors => of(log.table(errors)))
		);
	}

	/** Delete one item given an id */
	delete<T>(options: DeleteOneOptions): Observable<FetchResult<T>> {
		const apolloOptions = {
			mutation: options.gql,
			variables: { id: options.id },
		};
		const queryName = this.getQueryName(options);
		this.log('DeleteOne', options, queryName, apolloOptions.variables);

		if (this.checkNonOptimistic(options)) {
			return this.apollo.mutate(apolloOptions).pipe(
				first(),
				filter((r: any) => this.checkError(r)),
				map(({ data }) => data[queryName]),
				tap(data => this.logResult('DeleteOne', queryName, data)),
				catchError(errors => of(log.table(errors)))
			);
		}
		// TODO implement optimistic UI
		return this.apollo.mutate(apolloOptions).pipe(
			first(),
			filter((r: any) => this.checkError(r)),
			map(({ data }) => data[queryName]),
			catchError(errors => of(log.table(errors)))
		);
	}

	/** delete many items given an array of id */
	deleteMany<T>(options: DeleteManyOptions): Observable<any> {
		let query = options.ids.reduce((acc, curr) => `${acc} OR id ="${curr}"`, '');
		// removing the first ' OR '
		query = query.substr(4);
		const apolloOptions = {
			mutation: options.gql,
			variables: { query },
		};
		const queryName = this.getQueryName(options);
		this.log('DeleteMany', options, queryName, apolloOptions.variables);

		if (this.checkNonOptimistic(options)) {
			return this.apollo.mutate(apolloOptions).pipe(
				first(),
				filter((r: any) => this.checkError(r)),
				map(({ data }) => data[queryName]),
				catchError(errors => of(log.table(errors)))
			);
		}
		// TODO implement optimistic UI
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
		return new ApolloWrapper(this.apollo.use(name) as Apollo);
	}

	/** create appollo mutationOptions from our updateOptions */
	private createApolloMutationOptions(options: UpdateOptions) {
		return {
			mutation: options.gql,
			variables: { input: options.input },
		};
	}

	/** creates an optimistic response the way apollo expects it */
	private addOptimisticResponse(options: UpdateOptions) {
		(options as any).optimisticResponse = {
			__typename: 'Mutation',
			[this.getQueryName(options)]: {
				...options.input,
				__typename: options.typename
			},
		};
	}

	/** gets the query name from a gql statement */
	private getQueryName(options: any) {
		try {
			return (options.gql.definitions[0]).selectionSet.selections[0].name.value;
		} catch (e) {
			throw Error('query name not found in apollo client');
		}

	}

	private getQueryBody(options): string {
		return options.gql.loc.source.body;
	}

	/** check if optimistic update is disabled */
	private checkNonOptimistic(options: UpdateOptions | DeleteOneOptions | DeleteManyOptions) {
		if (options.preventOptimisticUi || !options.typename) {
			log.warn(`Doing a mutation without optimistic ui: ${this.getQueryName(options)}`);
			return true;
		}
	}

	/** logs events to the console */
	private log(type: string, options: any, queryName: string, variables?: any) {
		// check people don't use query
		if (options.gql.definitions[0].operation === 'query')
			log.error(`%c you are using a query, subscription should be used`);
		// logging for each request
		log.group(`%c ${type}, queryName: ${queryName}`, LogColor.APOLLO_CLIENT_PRE);
		log.debug(`%c queryName: ${queryName}`, LogColor.APOLLO_CLIENT_PRE);
		log.group(`%c gql`, 'color: fuchsia; background: #555555; padding: 4px');
		log.debug(`%c ${this.getQueryBody(options)}`, 'color: #555555');
		log.debug(options.gql);
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