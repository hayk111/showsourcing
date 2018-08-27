import gql from 'graphql-tag';
import { GlobalQueries } from '~global-services/_global/global-queries.class';

export class TeamUserQueries extends GlobalQueries {


	static readonly one = `
		user {
			id,
			firstName,
			lastName,
			email
		},
		status,
		accessType`;

	static readonly many = `
		id,
		user {
			id,
			firstName,
			lastName,
			email
		},
		status,
		accessType
	`;

	static readonly all = `
		id,
		user {
			id,
			firstName,
			lastName,
			email
		},
		status,
		accessType
	`;

}
