import { DocumentNode } from 'graphql';

export interface SelectOneOptions {
	query: DocumentNode;
	variables: {
		id: string;
	}
}

export interface SelectManyOptions {
	query: DocumentNode;
	variables: {
		query?: string;
		take?: number;
		skip?: number;
		descending?: boolean;
		sortBy?: string;
	}

}

