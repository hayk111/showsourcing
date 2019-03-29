import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class SupplierRequestQueries extends GlobalQueries {

	static readonly contact =
		`id, name, phoneNumber, email, jobTitle`;
	static readonly attachments = `attachments { id, fileName, url, size }`;
	static readonly requestElements = `requestElements { id, name, targetedEntityType, images { id, fileName, urls { id, url } }, ` +
		`${SupplierRequestQueries.attachments}, requestedFields { id, label, type }, reply { id, message, status } }`;
	static readonly recipient = `recipient { ${SupplierRequestQueries.contact} }`;
	static readonly sender = `sender { ${SupplierRequestQueries.contact} }`;
	static readonly images = ` images { id, urls { url }, orientation }`;

	// ${GlobalRequestQueries.recipient}
	// ${GlobalRequestQueries.sender}
	// sendCopyTo
	static readonly one = `
		message
		status
		creationDate
		lastUpdatedDate
	`;

	// ${GlobalRequestQueries.recipient}
	// ${GlobalRequestQueries.sender}
	// sendCopyTo
	static readonly many = `
		message
		status
		creationDate
		lastUpdatedDate
	`;

	static readonly all = `
		message
		status
		creationDate
		lastUpdatedDate
	`;

}

