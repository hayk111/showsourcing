import gql from 'graphql-tag';
import { GlobalQueries } from '~global-services/_global/global-queries.class';



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
		inviterFirstName,
		inviterLastName
	`;

	static readonly many = `
		email,
		accessType,
		status,
		inviterFirstName,
		inviterLastName
	`;

}
