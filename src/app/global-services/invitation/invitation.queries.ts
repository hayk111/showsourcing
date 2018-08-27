import gql from 'graphql-tag';
import { GlobalQueries } from '~global-services/_global/global-queries.class';



export class InvitationQueries extends GlobalQueries {

	static readonly one = `
		email
	`;

	static readonly many = `
	email
	`;

}
