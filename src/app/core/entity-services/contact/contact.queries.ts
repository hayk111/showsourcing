import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class ContactQueries extends GlobalQueries {

	static readonly one = `
		name,
		phoneNumber,
		email,
		jobTitle
		businessCardImage {
			id,
			fileName,
			urls { id, url }
		}
		supplier { id, name }
		creationDate
	`;

	static readonly many = `
		name,
		phoneNumber,
		email,
		jobTitle
		businessCardImage {
			id,
			fileName,
			urls { id, url }
		}
		supplier { id, name }
		creationDate
		`;

}
