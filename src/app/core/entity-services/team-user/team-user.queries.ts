import gql from 'graphql-tag';
import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export class TeamUserQueries extends GlobalQueries {


	static readonly one = `
		user {
			id,
			firstName,
			lastName,
			email,
			avatar {
				id,
				fileName
			}
		},
		status,
		accessType`;

	static readonly many = `
		id,
		user {
			id,
			firstName,
			lastName,
			email,
			avatar {
				id,
				fileName
			}
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
			email,
			avatar {
				id,
				fileName
			}
		},
		status,
		accessType
	`;

}
