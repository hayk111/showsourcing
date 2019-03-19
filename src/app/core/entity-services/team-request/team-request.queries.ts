import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class TeamRequestQueries extends GlobalQueries {

	static readonly contact =
		`id, name, phoneNumber, email, businessCardImage { id, fileName, urls { id, url } }, jobTitle, company`;
	static readonly attachments = `attachments { id, fileName, url, size }`;
	static readonly requestElements = `requestElements { id, name, targetedEntityType, images { id, fileName, urls { id, url } }, ` +
		`${TeamRequestQueries.attachments}, requestedFields { id, label, type }, reply { id, message, status } }`;
	static readonly recipient = `recipient { ${TeamRequestQueries.contact} }`;
	static readonly sender = `sender { ${TeamRequestQueries.contact} }`;
	static readonly images = ` images { id, urls { url }, orientation }`;

	// ${TeamRequestQueries.recipient}
	// ${TeamRequestQueries.sender}
	// sendCopyTo
	static readonly one = `
		${TeamRequestQueries.requestElements}
		${TeamRequestQueries.images}
		${TeamRequestQueries.attachments}
		message
		status
		creationDate
		lastUpdatedDate
		deleted
	`;

	// ${TeamRequestQueries.recipient}
	// ${TeamRequestQueries.sender}
	// sendCopyTo
	static readonly many = `
		${TeamRequestQueries.requestElements}
		message
		status
		creationDate
		lastUpdatedDate
		deleted
	`;

}

