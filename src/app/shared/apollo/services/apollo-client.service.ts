import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { R, TypedVariables } from 'apollo-angular/types';

import { FetchResult } from 'apollo-link';
import { Observable } from 'rxjs';
import { take, first, map } from 'rxjs/operators';
import { log } from '~utils';

import { UpdateOptions } from '../interfaces/update-options.interface';
import { SubribeToOneOptions, SubscribeToManyOptions } from '~shared/apollo/interfaces/subscription-option.interface';
import { DeleteOneOptions, DeleteManyOptions } from '~shared/apollo/interfaces/delete-options.interface';



/**
 * Wrapper around apollo that allows for automatic optimistic UI.
 */
@Injectable({
	providedIn: 'root'
})
export class ApolloClient {

	constructor(private apollo: Apollo) { }

	/**
	 * @deprecated it will be removed soon
	 */
	query<T>(options: any): any {
		log.error('query method is deprecated, do not use it !!!!');
		return this.apollo.watchQuery<T>(options);
	}

	selectOne(options: SubribeToOneOptions) {
		const queryName = this.getQueryName(options);
		const variables = { query: `id == "${options.id}"` };
		this.log(options, queryName, variables);

		return this.apollo.subscribe({ query: options.gql, variables })
			.pipe(
				// extracting the result
				// since we are getting an array back we only need the first one
				map(({ data }) => data[queryName][0])
			);
	}

	selectMany(options: SubscribeToManyOptions): Observable<any> {
		let { query, take, skip, sortBy, descending } = options;
		const queryName = this.getQueryName(options);
		const variables = {
			query,
			take,
			skip,
			sortBy,
			descending
		};
		this.log(options, queryName, variables);
		return this.apollo.subscribe({ query: options.gql, variables })
			.pipe(
				// extracting the result
				map(({ data }) => data[queryName])
			);
	}

	/** this method is used to update one existing entity*/
	update<T>(options: UpdateOptions): Observable<FetchResult<T>> {
		const apolloOptions = this.createApolloMutationOptions(options);
		const queryName = this.getQueryName(options);
		this.log(options, queryName, apolloOptions.variables);

		if (this.checkNonOptimistic(options)) {
			return this.apollo.mutate(apolloOptions).pipe(
				first(),
				map(({ data }) => data[queryName])
			);
		}

		this.addOptimisticResponse(options);
		return this.apollo.mutate<T>(apolloOptions).pipe(
			first(),
			map(({ data }) => data[queryName])
		);
	}

	/** this method is used to create one entity */
	create<T>(options: UpdateOptions): Observable<FetchResult<T>> {
		const apolloOptions = this.createApolloMutationOptions(options);
		const queryName = this.getQueryName(options);
		this.log(options, queryName, apolloOptions.variables);

		if (this.checkNonOptimistic(options)) {
			return this.apollo.mutate(apolloOptions).pipe(
				first(),
				map(({ data }) => data[queryName])
			);
		}
		// TODO implement optimistic UI
		return this.apollo.mutate(apolloOptions).pipe(
			first(),
			map(({ data }) => data[queryName])
		);
	}

	delete<T>(options: DeleteOneOptions): Observable<FetchResult<T>> {
		const apolloOptions = {
			mutation: options.gql,
			variables: { id: options.id },
		};
		const queryName = this.getQueryName(options);
		this.log(options, queryName, apolloOptions.variables);

		if (this.checkNonOptimistic(options)) {
			return this.apollo.mutate(apolloOptions).pipe(
				first(),
				map(({ data }) => data[queryName])
			);
		}
		// TODO implement optimistic UI
		return this.apollo.mutate(apolloOptions).pipe(
			first(),
			map(({ data }) => data[queryName])
		);
	}

	deleteMany<T>(options: DeleteManyOptions): Observable<any> {
		let query = options.ids.reduce((acc, curr) => `${acc} OR ${curr}`, '');
		// removing the first ' OR '
		query = query.substr(4);
		const apolloOptions = {
			mutation: options.gql,
			variables: { query },
		};
		const queryName = this.getQueryName(options);
		this.log(options, queryName, apolloOptions.variables);

		if (this.checkNonOptimistic(options)) {
			return this.apollo.mutate(apolloOptions).pipe(
				first(),
				map(({ data }) => data[queryName])
			);
		}
		// TODO implement optimistic UI
		return this.apollo.mutate(apolloOptions).pipe(
			first(),
			map(({ data }) => data[queryName])
		);
	}

	/** to use another named apollo client */
	use(name: string) {
		return new ApolloClient(this.apollo.use(name) as Apollo);
	}

	private createApolloMutationOptions(options: UpdateOptions) {
		return {
			mutation: options.gql,
			variables: { input: options.input },
		};
	}


	private addOptimisticResponse(options: UpdateOptions) {
		(options as any).optimisticResponse = {
			__typename: 'Mutation',
			[this.getQueryName(options)]: {
				...options.input,
				__typename: options.typename
			},
		};
	}

	private getQueryName(options: any) {
		return (options.gql.definitions[0]).name.value;
	}

	private checkNonOptimistic(options: UpdateOptions | DeleteOneOptions | DeleteManyOptions) {
		if (options.preventOptimisticUi || !options.typename) {
			log.warn(`Doing a mutation without optimistic ui: ${this.getQueryName(options)}`);
			return true;
		}
	}

	private log(options: any, queryName: string, variables: any) {
		// check people don't use query
		if (options.gql.definitions[0].operation === 'query')
			log.warn(`%c you are using a query, subscription should be used`, 'color: red');

		// logging for each request
		log.groupDebug(`%c Selecting one, queryName: ${queryName}`, 'color: teal, background: #ccc');
		log.debug(`%c queryName: ${queryName}`, 'color: green, background: #ccc');
		if (variables) {
			log.groupDebug(`%c variables`, 'color: green, background: #ccc');
			log.table()
		}
		log.debug(`%c gql: ${options.gql.loc.source.body}`, 'color: teal, background: #ccc');
		log.groupDebugEnd();
	}

}
