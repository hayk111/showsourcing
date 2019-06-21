import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class ImageQueries extends GlobalQueries {

	// deleted

	static readonly one = `
		fileName
		orientation
		imageType
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
		data
		urls { id, maxWidth, maxHeight, url }
		creationDate
		lastUpdatedDate
		createdBy { id, firstName, lastName }
		lastUpdatedBy { id, firstName, lastName }
	`;
}
