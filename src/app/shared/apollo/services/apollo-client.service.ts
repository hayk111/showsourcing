import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { R, TypedVariables } from 'apollo-angular/types';
import {
	ApolloClientOptions,
	MutationOptions as ApolloMutationOptions,
	SubscriptionOptions,
	WatchQueryOptions,
} from 'apollo-client';
import { FetchResult } from 'apollo-link';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { MutationOptions } from './mutation-options.interface';
import { AppApolloModule } from '~shared/apollo/apollo.module';

/**
 * Wrapper around apollo that allows for automatic optimistic UI.
 */
@Injectable({
	providedIn: 'root'
})
export class ApolloClient {

	constructor(private apollo: Apollo) { }

	/** patch functions start */
	query<T>(options: WatchQueryOptions): QueryRef<T, Record<string, any>> {
		return this.apollo.watchQuery<T>(options);
	}

	subscribe(options: SubscriptionOptions): Observable<any> {
		return this.apollo.subscribe(options);
	}

	/** this method is used to update an existing entity*/
	update<T, V = R>(options: MutationOptions): Observable<FetchResult<T>> {
		if (options.preventOptimisticUi) {
			return this.apollo.mutate<T>(options);
		}
		(options as ApolloMutationOptions).optimisticResponse = {
			__typename: 'Mutation',
			[(options.mutation.definitions[0] as any).name.value]: {
				...options.input,
				__typename: options.typename
			},
		};

		const apolloOptions = {
			mutation: options.mutation,
			variables: { input: options.input },
			context: options.context
		};

		return this.apollo.mutate<T>(apolloOptions).pipe(
			take(1)
		);
	}

	/** this method is used to create an entity */
	create<T, V = R>(options: MutationOptions & TypedVariables<V>): Observable<FetchResult<T>> {
		const apolloOptions = {
			mutation: options.mutation,
			variables: { input: options.input },
			context: options.context
		};
		// TODO optimistic ui update
		return this.apollo.mutate(apolloOptions).pipe(
			take(1)
		);
	}

	use(name: string) {
		return this.apollo.use(name);
	}

}
