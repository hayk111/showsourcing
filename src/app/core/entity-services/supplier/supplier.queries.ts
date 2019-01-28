import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class SupplierQueries extends GlobalQueries {

	static readonly supplierType = `supplierType { id, name }`;
	static readonly logoImage = `logoImage { fileName, urls { url } }`;
	static readonly createdBy = `createdBy { id, lastName, firstName, avatar { id, fileName, urls { id, url } } }`;
	static readonly status = `status { id, name, category, step, inWorkflow }`;
	static readonly categories = `categories { id, name }`;
	static readonly tags = ` tags { id, name }`;
	static readonly images = `images { id, urls { url }, orientation }`;
	static readonly attachments = `attachments { id, fileName, url, size }`;
	// tslint:disable-next-line:max-line-length
	static readonly productsCount = `productsCount:  _count(type: "Product", field: "supplier.id", query:"archived == false AND deleted == false")`;
	// tslint:disable-next-line:max-line-length
	// static readonly productsCount = `products: _LinkingObjects(objectType: "Product" property:"supplier" query:"archived == false AND deleted == false") { ... on ProductCollection { count }}`;
	static readonly comments = `comments { id, text, ${SupplierQueries.createdBy}, creationDate }`;

	static readonly one = `
			name,
			description,
			website,
			phoneNumber,
			country,
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
	`;

	static readonly update = `
		id,
		favorite,
		${SupplierQueries.comments}
	`;

}

