import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';
import { BaseQueries } from '~global-services/_global/base-query.class';

export class TeamUserQueries extends BaseQueries implements GlobalQuery {

	constructor() {
		super('teamUser', 'teamUsers');
	}

	oneDefaultSelection = `
		user {
			id,
			firstName,
			lastName,
			email
		},
		status,
		accessType`;

	manyDefaultSelection = `
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

	allDefaultSelection = this.manyDefaultSelection;


}
