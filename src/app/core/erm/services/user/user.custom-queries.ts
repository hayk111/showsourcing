import { CustomQueries } from '../_global/query-builder-2.class';



export const customQueries: CustomQueries = {
	queryOne: `
		query GetUser($id: ID!) {
			user(id: $id) {
				id
				firstName
				lastName
			}
		}
	`,
	queryMany: ``,
	queryAll: ``,
	create: ``,
	update: ``,
};

