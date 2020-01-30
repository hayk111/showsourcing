import { GlobalQueries } from '~core/orm/services/_global/global-queries.class';

export abstract class ContactQueries extends GlobalQueries {

	static readonly user = (name: string) => `${name} { id, firstName, lastName, avatar { id, urls { id, url } } }`;

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
		${ContactQueries.user('createdBy')}
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
		${ContactQueries.user('createdBy')}
	`;

}
