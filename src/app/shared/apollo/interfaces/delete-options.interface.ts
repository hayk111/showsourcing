import { DocumentNode } from 'graphql';

export interface DeleteOneOptions {
	gql: DocumentNode;
	id: string;
	typename?: string;
	preventOptimisticUi?: boolean;
}

export interface DeleteManyOptions {
	gql: DocumentNode;
	ids: string[];
	typename?: string;
	preventOptimisticUi?: boolean;
}