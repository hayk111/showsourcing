import gql from 'graphql-tag';
import {
	GlobalQuery
} from '~global-services/_global/global.query.interface';
import { BaseQueries } from '~global-services/_global/base-query.class';



export class SupplierQueries extends BaseQueries implements GlobalQuery {

	constructor() {
		super('supplier', 'suppliers');
	}

	oneDefaultSelection = `
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
			}
			contacts {
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

	manyDefaultSelection = `
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
		productCount
		`;

	updateDefaultSelection = `
			id,
			favorite
		`;

}

