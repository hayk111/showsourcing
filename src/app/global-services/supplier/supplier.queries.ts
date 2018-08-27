import gql from 'graphql-tag';
import { GlobalQueries } from '~global-services/_global/global-queries.class';



export abstract class SupplierQueries extends GlobalQueries {


	static readonly one = `
			name,
			description,
			website,
			phoneNumber,
			country,
			address,
			supplierType {
				id, name
			},
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
			logoImage {
				fileName
			},
			createdBy {
				id,
				lastName,
				firstName,
				avatar {
					id, fileName
				}
			},
			statuses {
				id,
				cancelled,
				status {
					id, name, category, step, inWorkflow
				}
			},
			categories {
				id,
				name
			},
			supplierType {
				id,
				name
			},
			images {
				id,
				fileName,
				orientation
			},
			tags {
				id,
				name
			},
			contacts {
				id,
				name,
				phoneNumber,
				email,
				jobTitle
				businessCardImage {
					id,
					fileName
				}
			}
		`;

	static readonly many = `
		name,
		description,
		country,
		favorite,
		tags {
			id,
			name
		},
		images {
			id, fileName, orientation
		},
		categories {
			id,
			name
		},
		creationDate,
		createdBy {
			id,
			firstName,
			lastName
		}
		productCount,
		contacts {
			id,
			name,
			phoneNumber,
			email,
			jobTitle
			businessCardImage {
				id,
				fileName
			}
		}
		`;

	static readonly update = `
			id,
			favorite
		`;

}

