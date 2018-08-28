import gql from 'graphql-tag';
import { GlobalQueries } from '~global-services/_global/global-queries.class';



export class InvitationQueries extends GlobalQueries {

	static readonly one = `
		email,
		accessType,
		status
	`;

	static readonly many = `
		email,
		accessType,
		status
	`;

}
