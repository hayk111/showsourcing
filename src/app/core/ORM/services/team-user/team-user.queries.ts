import { GlobalQueries } from '~core/orm/services/_global/global-queries.class';

export class TeamUserQueries extends GlobalQueries {


	static readonly one = `
		user {
			id,
			firstName,
			lastName,
			email,
			avatar {
				id,
				fileName,
				urls { id, url }
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
				urls { id, url }
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
				urls { id, url }
			}
		},
		status,
		accessType
	`;

}
