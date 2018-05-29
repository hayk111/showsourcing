import { MutationOptions as ApolloMutationOptions } from 'apollo-client';
import gql from 'graphql-tag';

export interface UpdateVariable {
	input: any;
}

export interface MutationOptions extends ApolloMutationOptions {
	variables: UpdateVariable;
	preventOptimisticUi: boolean;
}


