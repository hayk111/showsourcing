import { DocumentNode } from 'graphql';


export interface UpdateInput {
	id?: string;
	[key: string]: any;
}

// We are not extending MutationOptions from apollo-client as we don't want to reveal the whole interface
// We shall add fields when we seen fit
export interface UpdateOptions {
	gql: DocumentNode;
	input: any;
	typename?: string;
	preventOptimisticUi?: boolean;
}


