import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class SupplierRequestQueries extends GlobalQueries {

	static readonly contact = (name: string) =>
		`${name} { id, name, phoneNumber, email, jobTitle }`
	static readonly attachments = `attachments { id, fileName, url, size }`;
	static readonly requestElements = `requestElements { id, name, targetedEntityType, images { id, fileName, urls { id, url } }, ` +
		`${SupplierRequestQueries.attachments}, requestedFields { id, label, type }, reply { id, message, status } }`;
	static readonly images = ` images { id, urls { url }, orientation }`;

	static readonly one = `
		title
		${SupplierRequestQueries.contact('recipient')}
		${SupplierRequestQueries.contact('sender')}
		${SupplierRequestQueries.requestElements}
		sendCopyTo
		message
		status
		creationDate
		lastUpdatedDate
	`;

	static readonly many = `
		title
		${SupplierRequestQueries.contact('recipient')}
		${SupplierRequestQueries.requestElements}
		${SupplierRequestQueries.contact('sender')}
		sendCopyTo
		message
		status
		creationDate
		lastUpdatedDate
	`;

	static readonly all = `
		title
		${SupplierRequestQueries.contact('recipient')}
		${SupplierRequestQueries.contact('sender')}
		${SupplierRequestQueries.requestElements}
		message
		status
		creationDate
		lastUpdatedDate
	`;

}

