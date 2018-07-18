import { GlobalQuery } from '../_global/global.query.interface';
import gql from 'graphql-tag';

export class ProductQueries implements GlobalQuery {
	one: any = gql`
	subscription product($query: String!) {
		products(query: $query) {
			id,
			name,
			supplier {
				id,
				name,
				address,
				country,
				logoImage {
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
			description,
			event {
				id,
				alias,
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
					id, name, color, contrastColor, step
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
			}
		}
	}
	`;

	list = gql`
	subscription products(
		$take: Int,
		$skip: Int,
		$query: String!,
		$sortBy: String,
		$descending: Boolean) {

		products(
			take: $take,
			skip: $skip,
			query: $query,
			sortBy: $sortBy,
			descending: $descending) {

			id,
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
				fileName
			},
			status {
				id, name, color
			},
			favorite,
			statuses {
				id,
				cancelled,
				status {
					id, name, color, contrastColor, step
				}
			},
			score,
			minimumOrderQuantity
		}
	}`;

	create = gql`
		mutation createProduct($input: ProductInput!) {
			updateProduct(input: $input) {
				id, favorite
			}
		}
	`;


	update = gql`
		mutation updateProduct($input: ProductInput!) {
			updateProduct(input: $input) {
				id, favorite
			}
		}
	`;

	deleteOne = gql`
		mutation deleteProduct($id: String!) {
			deleteProduct(id: $id)
		}
	`;


	deleteMany = gql`
	mutation deleteProducts($query: String!) {
		deleteProducts(query: $query)
	}
	`;

	all = (str: string) => gql`
		subscription products {
			products {
				${str}
			}
		}
	`

}
