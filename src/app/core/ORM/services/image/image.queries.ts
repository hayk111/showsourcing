import { GlobalQueries } from '~core/orm/services/_global/global-queries.class';

export abstract class ImageQueries extends GlobalQueries {

	static readonly one = `
		fileName
		orientation
		imageType
		deleted
		data
		urls { id, maxWidth, maxHeight, url }
		creationDate
		lastUpdatedDate
		createdBy { id, firstName, lastName }
		lastUpdatedBy { id, firstName, lastName }
		`;

	static readonly many = `
		fileName
		orientation
		imageType
		deleted
		data
		urls { id, maxWidth, maxHeight, url }
		creationDate
		lastUpdatedDate
		createdBy { id, firstName, lastName }
		lastUpdatedBy { id, firstName, lastName }
	`;
}
