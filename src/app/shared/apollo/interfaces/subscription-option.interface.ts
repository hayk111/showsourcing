import { DocumentNode } from 'graphql';

export interface SubribeToOneOptions {
	gql: DocumentNode;
	id: any;
}

export interface SubscribeToManyOptions {
	gql: DocumentNode;
	query?: string;
	take?: number;
	skip?: number;
	descending?: boolean;
	sortBy?: string;
}

