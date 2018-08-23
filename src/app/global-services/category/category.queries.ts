import gql from 'graphql-tag';
import { GlobalQueries } from '~global-services/_global/global-queries.class';

export abstract class CategoryQueries extends GlobalQueries {

	static readonly one = `
			name,
			createdBy {
				id,
				firstName,
				lastName
			}
	`;

	static readonly many = `
		name,
		createdBy {
			id,
			firstName,
			lastName
		}
	`;

}
