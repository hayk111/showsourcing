import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class RequestReplyQueries extends GlobalQueries {

	static readonly fields = `fields { id, definition { id, label, type }, value }`;
	static readonly images = `images { id, orientation, imageType, urls { id, url } }`;
	static readonly attachments = `attachments { id, fileName, url, size }`;

	static readonly one = `
		message
		status
		${RequestReplyQueries.images}
		${RequestReplyQueries.attachments}
		${RequestReplyQueries.fields}
	`;

	static readonly many = `
		message
		status
		${RequestReplyQueries.images}
		${RequestReplyQueries.attachments}
		${RequestReplyQueries.fields}
	`;

}

