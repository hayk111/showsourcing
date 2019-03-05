import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class RequestElementQueries extends GlobalQueries {

	static readonly reply = `reply { id, message, status, fields { id, definition { id, label, type }, value } }`;
	static readonly attachments = `attachments { id, fileName, url, size, pending }`;
	static readonly images = ` images { id, urls { url }, orientation }`;
	static readonly requestedFields = `requestedFields { id, label, type }`;

	static readonly one = `
		name
		targetedEntity
		${RequestElementQueries.reply}
		${RequestElementQueries.images}
		${RequestElementQueries.attachments}
		${RequestElementQueries.requestedFields}
	`;

	static readonly many = `
		targetedEntity
		${RequestElementQueries.reply}
		${RequestElementQueries.images}
		${RequestElementQueries.attachments}
		${RequestElementQueries.requestedFields}
	`;

}

