import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { MutationOptions } from './mutation-options.interface';
import { MutationOptions as ApolloMutationOptions } from 'apollo-client';
import { TypedVariables } from 'apollo-angular/types';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { R } from 'apollo-angular/types';

/**
 * Wrapper around apollo that allows for automatic optimistic UI.
 */
@Injectable({
	providedIn: 'root'
})
export class ApolloClient {

	constructor(private apollo: Apollo) { }

	/** this method is used to update an existing entity*/
	update<T, V = R>(options: MutationOptions): Observable<FetchResult<T>> {
		if (options.preventOptimisticUi) {
			return this.apollo.mutate(options);
		}
		debugger;
		(options as ApolloMutationOptions).optimisticResponse = {
			__typename: 'Mutation',
			[updateComment]: {
				...options.variables.input,
				__typename: 'Comment',
			},
		};

		return this.apollo.mutate(options);


	}

	// /** this method is used to create an entity */
	// create<T, V = R>(options: MutationOptions & TypedVariables<V>): Observable<FetchResult<T>> {
	// 	options.optimisticResponse = ;
	// 	return super.mutate(options);
	// }

	get() {

	}
}
