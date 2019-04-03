import { GlobalQueries } from '~entity-services/_global/global-queries.class';

import { RequestElementQueries } from '../request-element/request-element.queries';

export abstract class SupplierRequestQueries extends GlobalQueries {

	static readonly contact = (name: string) =>
		`${name} { id, name, email, company }`
	static readonly attachments = `attachments { id, fileName, url, size }`;
	static readonly requestElements = `requestElements { id, ${RequestElementQueries.one}}`;
	static readonly images = ` images { id, urls { url }, orientation }`;

	static readonly one = `
		title
		${SupplierRequestQueries.contact('recipient')}
		${SupplierRequestQueries.contact('sender')}
		${SupplierRequestQueries.requestElements}
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

