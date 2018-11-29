import gql from 'graphql-tag';
import { GlobalQueries } from '~global-services/_global/global-queries.class';


export class UserQueries extends GlobalQueries {

	static readonly one = `
		id,
		firstName,
		lastName,
		email,
		phoneNumber,
		currentTeam {
			id, name, status
		},
		preferredLanguage,
		avatar {
			id, urls { url }, orientation, imageType
		},
		companyName
	`;


}
