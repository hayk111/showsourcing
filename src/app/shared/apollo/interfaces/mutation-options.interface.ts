import { DocumentNode } from 'graphql';


export interface MutationInput {
	id?: string;
	[key: string]: any;
}

// We are not extending MutationOptions from apollo-client as we don't want to reveal the whole interface
// We shall add fields when we seen fit
export interface MutationOptions {
	gql: DocumentNode;
	input: any;
	typename?: string;
	preventOptimisticUi?: boolean;
	context?: any;

	// errorPolicy?: ErrorPolicy;
	// fetchPolicy?: FetchPolicy;
}


