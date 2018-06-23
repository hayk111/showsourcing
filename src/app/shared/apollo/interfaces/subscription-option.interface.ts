export interface SubribeToOneOptions {
	gql: any;
	id: any;
}

export interface SubscribeToManyOptions {
	gql: any;
	query?: string;
	take?: number;
	skip?: number;
	descending?: boolean;
	sortBy?: string;
}

