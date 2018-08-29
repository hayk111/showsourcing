import gql from 'graphql-tag';
import { GlobalQueries } from '~global-services/_global/global-queries.class';
import { Supplier } from '~models';



export abstract class SupplierQueries extends GlobalQueries {

	static readonly supplierType = `supplierType { id, name }`;
	static readonly logoImage = `logoImage { fileName }`;
	static readonly createdBy = `createdBy { id, lastName, firstName, avatar { id, fileName } }`;
	static readonly statuses = `statuses { id, cancelled, status { id, name, category, step, inWorkflow } }`;
	static readonly categories = `categories { id, name }`;
	static readonly tags = ` tags { id, name }`;
	static readonly images = `images { id, fileName, orientation }`;
	static readonly contacts = `contacts { id, name, phoneNumber, email, jobTitle businessCardImage { id, fileName } }`;

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
			productCount,
			taskCount,
			creationDate,
			${SupplierQueries.supplierType}
			${SupplierQueries.logoImage}
			${SupplierQueries.createdBy}
			${SupplierQueries.statuses}
			${SupplierQueries.categories}
			${SupplierQueries.images}
			${SupplierQueries.tags}
			${SupplierQueries.contacts}
		`;

	static readonly many = `
		name,
		description,
		country,
		favorite,
		deleted,
		creationDate,
		productCount
		${SupplierQueries.categories}
		${SupplierQueries.images}
		${SupplierQueries.tags}
		${SupplierQueries.createdBy}
		`;

	static readonly update = `
		id,
		favorite
	`;

}

