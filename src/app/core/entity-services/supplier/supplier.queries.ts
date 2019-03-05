import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class SupplierQueries extends GlobalQueries {

	static readonly supplierType = `supplierType { id, name }`;
	static readonly logoImage = `logoImage { id, fileName, urls { url } }`;
	static readonly createdBy = `createdBy { id, lastName, firstName, avatar { id, fileName, urls { id, url } } }`;
	static readonly status = `status { id, name, category, step, inWorkflow }`;
	static readonly categories = `categories { id, name }`;
	static readonly tags = ` tags { id, name }`;
	static readonly images = `images { id, urls { url }, orientation }`;
	static readonly attachments = `attachments { id, fileName, url, size }`;
	// tslint:disable-next-line:max-line-length
	static readonly productsLinked = `productsLinked: _linkingObjects(objectType: "Product" property:"supplier" query:"deleted == false AND archived == false") { ... on ProductCollection { count }}`;
	static readonly comments = `comments { id, text, ${SupplierQueries.createdBy}, creationDate }`;
	static readonly extendedFields = `extendedFields { id, value, definition { id, label, type, order }}`;


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
			${SupplierQueries.comments}
			${SupplierQueries.supplierType}
			${SupplierQueries.logoImage}
			${SupplierQueries.createdBy}
			${SupplierQueries.status}
			${SupplierQueries.categories}
			${SupplierQueries.images}
			${SupplierQueries.attachments}
			${SupplierQueries.tags}
			${SupplierQueries.productsLinked}
			${SupplierQueries.extendedFields}
		`;

	static readonly many = `
		name,
		description,
		country,
		favorite,
		deleted,
		creationDate,
		${SupplierQueries.status}
		${SupplierQueries.categories}
		${SupplierQueries.images}
		${SupplierQueries.tags}
		${SupplierQueries.createdBy}
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
		${SupplierQueries.status}
		${SupplierQueries.categories}
		${SupplierQueries.images}
		${SupplierQueries.tags}
		${SupplierQueries.createdBy}
		${SupplierQueries.productsLinked}
		`;

	static readonly update = `
		id,
		favorite,
		${SupplierQueries.comments}
	`;

}

