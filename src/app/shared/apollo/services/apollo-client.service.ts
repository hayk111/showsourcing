import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { R, TypedVariables } from 'apollo-angular/types';
import { MutationOptions as ApolloMutationOptions, SubscriptionOptions, WatchQueryOptions } from 'apollo-client';
import { FetchResult } from 'apollo-link';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Log } from '~utils';

import { MutationOptions } from './mutation-options.interface';



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
	query<T>(options: WatchQueryOptions): QueryRef<T, Record<string, any>> {
		return this.apollo.watchQuery<T>(options);
	}

	subscribe(options: SubscriptionOptions): Observable<any> {
		return this.apollo.subscribe(options);
	}

	/** this method is used to update an existing entity*/
	update<T, V = R>(options: MutationOptions): Observable<FetchResult<T>> {
		const apolloOptions = this.createApolloOptions(options);

		if (this.checkNonOptimistic(options)) {
			return this.apollo.mutate(options);
		}

		this.addOptimisticResponse(options);
		return this.apollo.mutate<T>(apolloOptions).pipe(
			take(1)
		);
	}

	/** this method is used to create an entity */
	create<T, V = R>(options: MutationOptions & TypedVariables<V>): Observable<FetchResult<T>> {
		const apolloOptions = this.createApolloOptions(options);

		if (this.checkNonOptimistic(options)) {
			return this.apollo.mutate(options);
		}

		return this.apollo.mutate(apolloOptions).pipe(
			take(1)
		);
	}

	delete<T, V = R>(options: MutationOptions & TypedVariables<V>): Observable<FetchResult<T>> {
		const apolloOptions = this.createApolloOptions(options);

		if (this.checkNonOptimistic(options)) {
			return this.apollo.mutate(options);
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
			take(1)
		);
	}

	use(name: string) {
		return new ApolloClient(this.apollo.use(name) as Apollo);
	}

	private createApolloOptions(options: MutationOptions) {
		return {
			mutation: options.mutation,
			variables: { input: options.input },
			context: options.context
		};
	}

	private addOptimisticResponse(options: MutationOptions) {
		(options as ApolloMutationOptions).optimisticResponse = {
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
