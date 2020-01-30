import { GlobalQueries } from '~core/orm/services/_global/global-queries.class';

import { RequestElementQueries } from '../request-element/request-element.queries';

export abstract class SupplierRequestQueries extends GlobalQueries {

	static readonly contact = (name: string) =>
		`${name} { id, name, email, company }`
	static readonly attachments = `attachments { id, fileName, url, size }`;
	static readonly requestElements = `requestElements { id, ${RequestElementQueries.one}}`;
	static readonly images = ` images { id, urls { url }, orientation }`;

	static readonly one = `
		title
		templateName
		${SupplierRequestQueries.contact('recipient')}
		${SupplierRequestQueries.contact('sender')}
		${SupplierRequestQueries.requestElements}
		message
		status
		creationDate
		lastUpdatedDate
		sentDate
	`;

	static readonly many = `
		title
		templateName
		${SupplierRequestQueries.contact('recipient')}
		${SupplierRequestQueries.requestElements}
		${SupplierRequestQueries.contact('sender')}
		message
		status
		creationDate
		lastUpdatedDate
		sentDate
		`;

	static readonly all = `
		title
		templateName
		${SupplierRequestQueries.contact('recipient')}
		${SupplierRequestQueries.contact('sender')}
		${SupplierRequestQueries.requestElements}
		message
		status
		creationDate
		lastUpdatedDate
		sentDate
		`;

}

