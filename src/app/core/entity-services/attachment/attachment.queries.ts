import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class AttachmentQueries extends GlobalQueries {

	static readonly one = `
		fileName
		url
		size
	`;

	static readonly many = `
		fileName
		url
		size
	`;

}
