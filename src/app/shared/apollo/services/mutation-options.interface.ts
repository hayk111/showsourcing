import { MutationOptions as ApolloMutationOptions, ErrorPolicy, FetchPolicy } from 'apollo-client';
import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';

export interface MutationVariable {
	// all mutation variables must be named input in order to easily do optimistic UI
	// having a set name will allow us to allow additional variables
	input: any;
}

// We are not extending MutationOptions from apollo-client as we don't want to reveal the whole interface
// We shall add fields when we seen fit
export interface MutationOptions {
	mutation: DocumentNode;
	variables: MutationVariable;
	preventOptimisticUi: boolean;
	context: any;

	// errorPolicy?: ErrorPolicy;
	// fetchPolicy?: FetchPolicy;
}


