import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class SupplierQueries extends GlobalQueries {

	static readonly supplierType = `supplierType { id, name }`;
	static readonly logoImage = `logoImage { id, fileName, urls { url } }`;
	static readonly user = (name) => `${name} { id, lastName, firstName, avatar { id, fileName, urls { id, url } } }`;
	static readonly status = `status { id, name, category, step, inWorkflow }`;
	static readonly categories = `categories { id, name }`;
	static readonly tags = ` tags { id, name }`;
	static readonly images = `images { id, urls { url }, orientation }`;
	static readonly attachments = `attachments { id, fileName, url, size }`;
	// tslint:disable-next-line:max-line-length
	static readonly productsLinked = `productsLinked: _linkingObjects(objectType: "Product" property:"supplier" query:"deleted == false AND archived == false") { ... on ProductCollection { count }}`;
	static readonly comments = `comments { id, text, ${SupplierQueries.user('createdBy')}, creationDate }`;
	static readonly definition = (name: string) => `${name} { id, label, type, order, metadata }`;
	static readonly extendedFields = `extendedFields {
		id, value,
		selectorValue { id, value, ${SupplierQueries.definition('fieldDefinition')} },
		${SupplierQueries.definition('definition')}
	}`;

	static readonly one = `
			name,
			description,
			website,
			phoneNumber,
			country,
			city,
			address,
			officeEmail,
			officePhone,
			incoTerm,
			harbour,
			favorite,
			generalMOQ,
			generalLeadTime,
			creationDate,
			lastUpdatedDate,
			${SupplierQueries.comments}
			${SupplierQueries.supplierType}
			${SupplierQueries.logoImage}
			${SupplierQueries.user('createdBy')}
			${SupplierQueries.user('lastUpdatedBy')}
			${SupplierQueries.status}
			${SupplierQueries.categories}
			${SupplierQueries.images}
			${SupplierQueries.attachments}
			${SupplierQueries.tags}
			${SupplierQueries.productsLinked}
		`;

	static readonly many = `
		name,
		description,
		country,
		favorite,
		deleted,
		creationDate,
		lastUpdatedDate,
		${SupplierQueries.status}
		${SupplierQueries.categories}
		${SupplierQueries.images}
		${SupplierQueries.tags}
		${SupplierQueries.user('createdBy')}
		${SupplierQueries.user('lastUpdatedBy')}
		${SupplierQueries.productsLinked}
		${SupplierQueries.logoImage}
	`;

	static readonly all = `
		name,
		description,
		country,
		favorite,
		deleted,
		creationDate,
		lastUpdatedDate,
		${SupplierQueries.status}
		${SupplierQueries.categories}
		${SupplierQueries.images}
		${SupplierQueries.tags}
		${SupplierQueries.user('createdBy')}
		${SupplierQueries.user('lastUpdatedBy')}
		${SupplierQueries.productsLinked}
	`;

	static readonly update = `
		id,
		favorite,
		${SupplierQueries.comments}
	`;

}

