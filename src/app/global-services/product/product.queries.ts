import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';
import { BaseQueries } from '~global-services/_global/base-query.class';

export class ProductQueries extends BaseQueries implements GlobalQuery {

	constructor() {
		super('product', 'products');
	}


	oneDefaultSelection = `
			name,
			supplier {
				id,
				name,
				address,
				country,
				favorite,
				logoImage {
					id,
					fileName
				},
				categories {
					id,
					name
				},
				images {
					id,
					fileName
				}
			},
			images {
				id, fileName, orientation
			},
			price {
				id,
				currency,
				value,
				baseCurrencyValue
			},
			category {
				id, name
			},
			projects {
				id, name, productCount, description
			}
			description,
			event {
				id,
				name,
				description {
					id
					logoImage {
						id,
						fileName
					}
				}
			},
			favorite,
			statuses {
				id,
				cancelled,
				status {
					id, name, category, step
				}
			},
			tags {
				id, name
			},
			minimumOrderQuantity,
			moqDescription,
			score,
			votes {
				id,
				value,
				user {
					id
				}
			}
			innerCarton {
				id,
				height,
				width,
				length,
				unit,
				itemsQuantity,
				weight,
				weightUnit,
			}
			masterCarton {
				id,
				height,
				width,
				length,
				unit,
				itemsQuantity,
				weight,
				weightUnit,
			}
			priceMatrix {
				id,
				rows {
					id,
					label,
					price {
						id,
						value,
						currency
					}
				}
			}
			leadTimeValue,
			leadTimeUnit,
			sample,
			samplePrice,
			createdBy {
				id, firstName, lastName
			},
			creationDate
			`;

	manyDefaultSelection = `
			name,
			description,
			creationDate,
			createdBy {
				id,
				lastName,
				firstName
			},
			images {
				id, fileName, orientation
			},
			supplier {
				id,
				name
			},
			category {
				id,
				name
			},
			price {
				id,
				value,
				currency
			},
			images {
				id,
				fileName
			},
			favorite,
			statuses {
				id,
				cancelled,
				status {
					id, name, step, category, inWorkflow
				}
			},
			score,
			minimumOrderQuantity,
			votes {
				id,
				user {
					id
				},
				value
			},
			projects {
				id
			}
		`;

	updateDefaultSelection = `
		favorite
		votes {
			id
			user { id }
			value
		}
		projects { id }
		`;
}
