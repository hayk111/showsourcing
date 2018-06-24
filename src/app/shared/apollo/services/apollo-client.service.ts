import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { R, TypedVariables } from 'apollo-angular/types';

import { FetchResult } from 'apollo-link';
import { Observable } from 'rxjs';
import { take, first, map } from 'rxjs/operators';
import { Log } from '~utils';

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
		return this.apollo.watchQuery<T>(options);
	}

	selectOne(options: SubribeToOneOptions) {
		return this.apollo.subscribe({
			query: options.gql,
			variables: { query: `id == "${options.id}"` }
		}).pipe(
			// extracting the result
			// since we are getting an array back we only need the first one
			map(({ data }) => data[this.getQueryName(options, 'subscription')][0])
		);
	}

	selectMany(options: SubscribeToManyOptions): Observable<any> {
		let { query, take, skip, sortBy, descending } = options;
		return this.apollo.subscribe({
			query: options.gql,
			variables: {
				query,
				take,
				skip,
				sortBy,
				descending
			}
		}).pipe(
			// extracting the result
			map(({ data }) => data[this.getQueryName(options, 'subscription')])
		);
	}

	/** this method is used to update one existing entity*/
	update<T>(options: UpdateOptions): Observable<FetchResult<T>> {
		const apolloOptions = this.createApolloMutationOptions(options);

		if (this.checkNonOptimistic(options)) {
			return this.apollo.mutate(apolloOptions).pipe(
				first(),
				map(({ data }) => data[this.getQueryName(options)])
			);
		}

		this.addOptimisticResponse(options);
		return this.apollo.mutate<T>(apolloOptions).pipe(
			first(),
			map(({ data }) => data[this.getQueryName(options)])
		);
	}

	/** this method is used to create one entity */
	create<T>(options: UpdateOptions): Observable<FetchResult<T>> {
		const apolloOptions = this.createApolloMutationOptions(options);

		if (this.checkNonOptimistic(options)) {
			return this.apollo.mutate(apolloOptions).pipe(
				first(),
				map(({ data }) => data[this.getQueryName(options)])
			);
		}
		// TODO implement optimistic UI
		return this.apollo.mutate(apolloOptions).pipe(
			first(),
			map(({ data }) => data[this.getQueryName(options)])
		);
	}

	delete<T>(options: DeleteOneOptions): Observable<FetchResult<T>> {
		const apolloOptions = {
			mutation: options.gql,
			variables: { id: options.id },
		};

		if (this.checkNonOptimistic(options)) {
			return this.apollo.mutate(apolloOptions).pipe(
				first(),
				map(({ data }) => data[this.getQueryName(options)])
			);
		}
		// TODO implement optimistic UI
		return this.apollo.mutate(apolloOptions).pipe(
			first(),
			map(({ data }) => data[this.getQueryName(options)])
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

		if (this.checkNonOptimistic(options)) {
			return this.apollo.mutate(apolloOptions).pipe(
				first(),
				map(({ data }) => data[this.getQueryName(options)])
			);
		}
		// TODO implement optimistic UI
		return this.apollo.mutate(apolloOptions).pipe(
			first(),
			map(({ data }) => data[this.getQueryName(options)])
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

	private getQueryName(options: any, type: string = 'mutation') {
		return (options.gql.definitions[0]).name.value;
	}

	private checkNonOptimistic(options: UpdateOptions | DeleteOneOptions | DeleteManyOptions) {
		if (options.preventOptimisticUi || !options.typename) {
			Log.warn(`Doing a mutation without optimistic ui: ${this.getQueryName(options)}`);
			return true;
		}
	}

}
