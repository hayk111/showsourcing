import gql from 'graphql-tag';

export class ProductQueries {
	static list = gql`
		query products($take: Int, $skip: Int, $query: String!, $sortBy: String, $descending: Boolean) {
			products(take: $take, skip: $skip, query: $query, sortBy: $sortBy, descending: $descending) {
				id,
				name,
				description,
				creationDate,
				createdBy {
					lastName,
					firstName
				},
				supplier {
					name
				},
				category {
					name
				},
				price {
					value,
					currency
				},
				createdBy {
					firstName,
					lastName
				}
				images {
					fileName
				},
				status {
					id, name, color
				},
				favorite,
				score,
				minimumOrderQuantity
			}
		}`;

	static oneProduct = gql`
		subscription products($query: String!) {
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
					id, fileName
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
					id, alias,
					description {
						id
						logoImage {
							id,
							fileName
						}
					}
				},
				favorite,
				status {
					id, name, color
				},
				tags {
					id, name
				},
				minimumOrderQuantity,
				moqDescription,
				score,
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
				taskCount,
				createdBy {
					id, name
				}
			}
		}
	`;

	static updateProduct = gql`
		mutation updateProduct($input: ProductInput!) {
			updateProduct(input: $input) {
				id, favorite
			}
		}
	`;

	static deleteProduct = gql`
		mutation deleteProduct($input: String!) {
			deleteProduct(id: $input)
		}
	`;
}
