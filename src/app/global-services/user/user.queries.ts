import gql from 'graphql-tag';
import { GlobalQuery } from '~global-services/_global/global.query.interface';
import { BaseQueries } from '~global-services/_global/base-query.class';


export class UserQueries extends BaseQueries implements GlobalQuery {

	constructor() {
		super('user', 'users');
	}

	oneDefaultSelection = `
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
			id, fileName, orientation
		},
		companyName
	`;


}
