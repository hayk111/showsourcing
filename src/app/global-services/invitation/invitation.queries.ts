import gql from 'graphql-tag';
import {
	GlobalQuery
} from '~global-services/_global/global.query.interface';
import { BaseQueries } from '~global-services/_global/base-query.class';



export class InvitationQueries extends BaseQueries implements GlobalQuery {

	oneDefaultSelection = `
		email
	`;

	manyDefaultSelection = `
	email
	`;

	constructor() {
		super('invitation', 'invitations');
	}

}
