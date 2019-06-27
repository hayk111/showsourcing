import { GlobalQueries } from '~entity-services/_global/global-queries.class';
import { RequestReplyQueries } from '../request-reply/request-reply.queries';

export abstract class RequestElementQueries extends GlobalQueries {

	static readonly reply = `reply { id, ${RequestReplyQueries.one} }`;
	static readonly attachments = `attachments { id, fileName, url, size }`;
	static readonly images = ` images { id, urls { id, url, maxHeight, maxWidth }, orientation }`;

	static readonly one = `
		name
		targetedEntityType
		targetId
		${RequestElementQueries.reply}
		${RequestElementQueries.images}
		${RequestElementQueries.attachments}
	`;

	static readonly many = `
		name
		targetedEntityType
		targetId
		${RequestElementQueries.reply}
		${RequestElementQueries.images}
		${RequestElementQueries.attachments}
	`;

}

