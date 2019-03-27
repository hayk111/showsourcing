import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class RequestReplyQueries extends GlobalQueries {

	static readonly fields = `fields { id, definition { id, label, type }, value }`;

	static readonly one = `
		message
		status
		${RequestReplyQueries.fields}
	`;

	static readonly many = `
		message
		status
		${RequestReplyQueries.fields}
	`;

}

