import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class RequestQueries extends GlobalQueries {

	static readonly contact =
		`id, name, phoneNumber, email, businessCardImage { id, fileName, urls { id, url } }, jobTitle, company`;
	static readonly attachments = `attachments { id, fileName, url, size }`;
	static readonly requestElements = `requestElements { id, name, targetedEntity, images { id, fileName, urls { id, url } }, ` +
		`${RequestQueries.attachments}, requestedFields { id, label, type }, reply { id, message, status } }`;
	static readonly recipient = `recipient { ${RequestQueries.contact} }`;
	static readonly sender = `sender { ${RequestQueries.contact} }`;
	static readonly images = ` images { id, urls { url }, orientation }`;

	static readonly one = `
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

