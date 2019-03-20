import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class RequestQueries extends GlobalQueries {

	static readonly attachments = `attachments { id, fileName, url, size }`;
	static readonly requestElements = `requestElements { id, name, targetedEntityType, images { id, fileName, urls { id, url } }, ` +
		`${RequestQueries.attachments}, requestedFields { id, label, type }, reply { id, message, status } }`;
	static readonly contact = (name: string) =>
		`${name} { id, name, phoneNumber, email, businessCardImage { id, fileName, urls { id, url } }, jobTitle, supplier { id, name } }`
	static readonly images = `images { id, urls { url }, orientation }`;
	static readonly products = `products { id, name, images { id, fileName, urls { id, url } },  price { id, currency, value } }`;
	static readonly requestTemplate = `requestTemplate { id, name, targetedEntity }`;
	static readonly createdBy = `createdBy { id, firstName, lastName }`;

	static readonly one = `
		${RequestQueries.requestElements}
		${RequestQueries.images}
		${RequestQueries.attachments}
		${RequestQueries.requestTemplate}
		${RequestQueries.createdBy}
		${RequestQueries.contact('recipient')}
		sendCopyTo
		title
		message
		status
		creationDate
		lastUpdatedDate
		deleted
	`;

	static readonly many = `
		${RequestQueries.requestElements}
		${RequestQueries.images}
		${RequestQueries.requestTemplate}
		${RequestQueries.createdBy}
		${RequestQueries.contact('recipient')}
		sendCopyTo
		title
		message
		status
		creationDate
		lastUpdatedDate
		deleted
	`;

}

