import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';
import { BaseQueries } from '~global-services/_global/base-query.class';

export class ContactQueries extends BaseQueries implements GlobalQuery {

	constructor() {
		super('contact', 'contacts')
	}

	oneDefaultSelection = `
		name,
		phoneNumber,
		email,
		jobTitle
		businessCardImage {
			id,
			fileName
		}
	`;

	manyDefaultSelection = `
		name,
		phoneNumber,
		email,
		jobTitle
		businessCardImage {
			id,
			fileName
		}
	`;

}
