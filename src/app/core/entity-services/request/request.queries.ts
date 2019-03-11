import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class RequestQueries extends GlobalQueries {

	static readonly contact =
		`id, name, phoneNumber, email, businessCardImage { id, fileName, urls { id, url } }, jobTitle, supplier { id, name }`;
	static readonly attachments = `attachments { id, fileName, url, size, pending }`;
	static readonly requestElements = `requestElements { id, name, targetedEntity, images { id, fileName, urls { id, url } }, ` +
		`${RequestQueries.attachments}, requestedFields { id, definition, value } }`;
	static readonly recipient = `recipient { ${RequestQueries.contact} }`;
	static readonly sender = `sender { ${RequestQueries.contact} }`;
	static readonly images = ` images { id, urls { url }, orientation }`;

	static readonly one = `
		name
		${RequestQueries.requestElements}
		${RequestQueries.recipient}
		${RequestQueries.sender}
		${RequestQueries.images}
		${RequestQueries.attachments}
		message
		sendCopyTo
		status
		creationDate
		lastUpdatedDate
	`;

	static readonly many = `
		name
		${RequestQueries.requestElements}
		${RequestQueries.recipient}
		${RequestQueries.sender}
		message
		sendCopyTo
		status
		creationDate
		lastUpdatedDate
	`;

}

