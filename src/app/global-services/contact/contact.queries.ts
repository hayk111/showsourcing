import gql from 'graphql-tag';
import { GlobalQueries } from '~global-services/_global/global-queries.class';

export abstract class ContactQueries extends GlobalQueries {

	static readonly one = `
		name,
		phoneNumber,
		email,
		jobTitle
		businessCardImage {
			id,
			fileName
		}
	`;

	static readonly many = `
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
