import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FetchResult, DocumentNode } from 'apollo-link';
import { Observable, of, throwError, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { catchError, filter, first, map, shareReplay, tap, switchMap } from 'rxjs/operators';
import { DeleteManyOptions, DeleteOneOptions } from '~shared/apollo/interfaces/delete-options.interface';
import { SelectOneOptions, SelectManyOptions } from '~shared/apollo/interfaces/select-option.interface';
import { log, LogColor } from '~utils';

import { UpdateOptions } from '~shared/apollo/interfaces/update-options.interface';
import gql from 'graphql-tag';
import { RefetchParams } from '~shared/apollo/services/refetch.interface';
import { SelectParams } from '~global-services/_global/select-params';


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
		const variables = { query: `id == "${options.id}"` };
		this.log('Selecting One', options, queryName, variables);
		return this.apollo.subscribe({ query: options.gql, variables })
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

	selectMany(options: SelectManyOptions): Observable<any> {
		const { gql, ...variables } = options;
		const queryName = this.getQueryName(options);
		this.log('Selecting Many', options, queryName, variables);
		return this.apollo.subscribe({ query: gql, variables })
			.pipe(
				filter((r: any) => this.checkError(r)),
				// extracting the result
				map((r) => r.data[queryName]),
				tap(data => this.logResult('Selecting Many', queryName, data)),
				catchError(errors => of(log.table(errors))),
		);
	}


	/** same as select many but it's a query instead of a subscription */
	selectList(options: SelectManyOptions): Observable<any[]> {
		const { gql, ...variables } = options;
		const queryName = this.getQueryName(options);
		this.log('Selecting List', options, queryName, variables);
		return this.apollo.watchQuery({ query: gql, variables }).valueChanges
			.pipe(
				filter((r: any) => this.checkError(r)),
				// extracting the result
				map((r) => r.data[queryName]),
				tap(data => this.logResult('Selecting List', queryName, data)),
				catchError((errors) => of(log.table(errors))),
		);
	}

	/////////////////////////////
	//   SELECT ALL SECTION    //
	/////////////////////////////

	/** select all entities given the query */
	selectAll(options: SelectManyOptions): Observable<any> {
		const { gql } = options;
		const queryName = this.getQueryName(options);
		this.log('Selecting All', options, queryName);

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
	update<T>(options: UpdateOptions): Observable<FetchResult<T>> {
		let apolloOptions: any = this.createApolloMutationOptions(options);
		const queryName = this.getQueryName(options);
		this.log('Update', options, queryName, apolloOptions.variables);

		if (this.checkOptimistic(options)) {
			this.addOptimisticResponse(apolloOptions, options);
		}
		return this.apollo.mutate(apolloOptions).pipe(
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
		options.refetchParams.params$.pipe(

		)
		const apolloOptions = {
			mutation: options.gql,
			variables: { id: options.id },
			refetchQueries: [


			]
		};
		const queryName = this.getQueryName(options);
		this.log('DeleteOne', options, queryName, apolloOptions.variables);

		// return of(options.refetchParams).pipe(
		// 	switchMap(refParams => )
		// )

		this.apollo.mutate(apolloOptions).pipe(
			first(),
			filter((r: any) => this.checkError(r)),
			map(({ data }) => data[queryName]),
			catchError(errors => of(log.table(errors)))
		);
	}

	private refetchParamsToQuery(refParams: RefetchParams) {
		refParams.params$.pipe(
			map((params: SelectParams) => params.toWrapperOptions(gql))
		);
	}

	/** delete many items given an array of id */
	deleteMany<T>(options: DeleteManyOptions): Observable<any> {
		let query = options.ids.reduce((acc, curr) => `${acc} OR id ="${curr}"`, '');
		// removing the first ' OR '
		query = query.substr(4);
		const apolloOptions = {
			mutation: options.gql,
			variables: { query }
		};
		const queryName = this.getQueryName(options);
		this.log('DeleteMany', options, queryName, apolloOptions.variables);

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
	private createApolloMutationOptions(options: UpdateOptions) {
		return {
			mutation: options.gql,
			variables: { input: options.input },
		};
	}

	/** creates an optimistic response the way apollo expects it */
	private addOptimisticResponse(apolloOptions: any, options: UpdateOptions) {
		apolloOptions.optimisticResponse = {
			__typename: 'Mutation',
			[this.getQueryName(options)]: {
				...options.input,
				__typename: options.typename
			},
		};
	}

	/** gets the query name from a gql statement */
	private getQueryName(gql: DocumentNode) {
		try {
			return (gql.definitions[0] as any).selectionSet.selections[0].name.value;
		} catch (e) {
			throw Error('query name not found in apollo client');
		}

	}

	private getQueryBody(options): string {
		return options.gql.loc.source.body;
	}

	/** check if optimistic update is disabled */
	private checkOptimistic(options: UpdateOptions | DeleteOneOptions | DeleteManyOptions) {
		if (!options.preventOptimisticUi && options.typename) {
			return true;
		}
		log.warn(`Doing a mutation without optimistic ui: ${this.getQueryName(options)}`);
	}

	/** logs events to the console */
	private log(type: string, options: any, queryName: string, variables?: any) {
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
