import gql from 'graphql-tag';
import { GlobalQueries } from '~entity-services/_global/global-queries.class';



export class InvitationQueries extends GlobalQueries {

	/**
	 * 		inviter {
				id,
				firstName,
				lastName,
				companyName
			}
	 */

	static readonly one = `
		email,
		accessType,
		status,
		inviter { id, firstName, lastName }
	`;

	static readonly many = `
		email,
		accessType,
		status,
		inviter { id, firstName, lastName }
	`;

}
