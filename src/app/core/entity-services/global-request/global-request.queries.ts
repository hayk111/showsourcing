import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class GlobalRequestQueries extends GlobalQueries {

	static readonly contact =
		`id, name, phoneNumber, email, businessCardImage { id, fileName, urls { id, url } }, jobTitle, company`;
	static readonly attachments = `attachments { id, fileName, url, size }`;
	static readonly requestElements = `requestElements { id, name, targetedEntityType, images { id, fileName, urls { id, url } }, ` +
		`${GlobalRequestQueries.attachments}, requestedFields { id, label, type }, reply { id, message, status } }`;
	static readonly recipient = `recipient { ${GlobalRequestQueries.contact} }`;
	static readonly sender = `sender { ${GlobalRequestQueries.contact} }`;
	static readonly images = ` images { id, urls { url }, orientation }`;

	// ${GlobalRequestQueries.recipient}
	// ${GlobalRequestQueries.sender}
	// sendCopyTo
	static readonly one = `
		${GlobalRequestQueries.requestElements}
		${GlobalRequestQueries.images}
		${GlobalRequestQueries.attachments}
		message
		status
		creationDate
		lastUpdatedDate
	`;

	// ${GlobalRequestQueries.recipient}
	// ${GlobalRequestQueries.sender}
	// sendCopyTo
	static readonly many = `
		${GlobalRequestQueries.requestElements}
		message
		status
		creationDate
		lastUpdatedDate
	`;

}

