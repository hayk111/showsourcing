import { DocumentNode } from 'graphql';
import { RefetchParams } from '~shared/apollo/services/refetch.interface';

export interface DeleteOneOptions {
	gql: DocumentNode;
	id: string;
	typename?: string;
	preventOptimisticUi?: boolean;
	refetchParams?: RefetchParams;
}

export interface DeleteManyOptions {
	gql: DocumentNode;
	ids: string[];
	typename?: string;
	preventOptimisticUi?: boolean;
	refetchParams?: RefetchParams;
}