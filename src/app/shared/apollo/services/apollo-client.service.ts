import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { R, TypedVariables } from 'apollo-angular/types';
import {
	MutationOptions as ApolloMutationOptions,
	SubscriptionOptions as ApolloSubscriptionOptions
} from 'apollo-client';
import { FetchResult } from 'apollo-link';
import { Observable } from 'rxjs';
import { take, first } from 'rxjs/operators';
import { Log } from '~utils';

import { MutationOptions } from '../interfaces/mutation-options.interface';
import { SubribeToOneOptions, SubscribeToManyOptions } from '~shared/apollo/interfaces/subscription-option.interface';



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
		});
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
		});
	}

	/** this method is used to update one existing entity*/
	update<T, V = R>(options: MutationOptions): Observable<FetchResult<T>> {
		const apolloOptions = this.createApolloMutationOptions(options);

		if (this.checkNonOptimistic(options)) {
			return this.apollo.mutate(apolloOptions);
		}

		this.addOptimisticResponse(options);
		return this.apollo.mutate<T>(apolloOptions).pipe(
			first()
		);
	}

	/** this method is used to create one entity */
	create<T, V = R>(options: MutationOptions & TypedVariables<V>): Observable<FetchResult<T>> {
		const apolloOptions = this.createApolloMutationOptions(options);

		if (this.checkNonOptimistic(options)) {
			return this.apollo.mutate(apolloOptions);
		}

		return this.apollo.mutate(apolloOptions).pipe(
			first()
		);
	}

	delete<T, V = R>(options: MutationOptions & TypedVariables<V>): Observable<FetchResult<T>> {
		const apolloOptions = this.createApolloMutationOptions(options);

		if (this.checkNonOptimistic(options)) {
			return this.apollo.mutate(apolloOptions);
		}
		// (options as any).update = (proxy, { data: { submitComment } }) => {
		// 	// Read the data from our cache for this query.
		// 	const data = proxy.readQuery({ query: CommentAppQuery });
		// 	// Add our comment from the mutation to the end.
		// 	data.comments.push(submitComment);
		// 	// Write our data back to the cache.
		// 	proxy.writeQuery({ query: CommentAppQuery, data });
		// };
		return this.apollo.mutate(apolloOptions).pipe(
			first()
		);
	}

	/** to use another named apollo client */
	use(name: string) {
		return new ApolloClient(this.apollo.use(name) as Apollo);
	}

	private createApolloMutationOptions(options: MutationOptions) {
		return {
			mutation: options.gql,
			variables: { input: options.input },
			context: options.context
		};
	}

	private addOptimisticResponse(options: MutationOptions) {
		(options as any).optimisticResponse = {
			__typename: 'Mutation',
			[this.getQueryName(options)]: {
				...options.input,
				__typename: options.typename
			},
		};
	}

	private getQueryName(options: any) {
		return (options.mutation.definitions[0]).name.value;
	}

	private checkNonOptimistic(options: MutationOptions) {
		if (options.preventOptimisticUi || !options.typename) {
			Log.warn(`Doing a mutation without optimistic ui: ${this.getQueryName(options)}`);
			return true;
		}
	}

}
