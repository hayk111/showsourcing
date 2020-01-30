import { GlobalQueries } from '~core/erm/services/_global/global-queries.class';

export abstract class RequestReplyQueries extends GlobalQueries {

	static readonly fields = `fields { id, definition { id, label, type, target, originId, metadata }, value }`;
	static readonly images = `images { id, orientation, fileName, imageType, deleted, urls { id, url, maxWidth, maxHeight } }`;
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

