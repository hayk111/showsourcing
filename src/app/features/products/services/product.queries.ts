import gql from 'graphql-tag';

export class ProductQueries {
	static list = gql`
	query products($query: String!) {
		products(take: 30, query: $query) {
			id,
			name,
			description,
			creationDate,
			createdBy {
				lastName,
				firstName
			}
		}
	}`;

	static oneProduct = gql`
		subscription products($query: String!) {
			products(query: $query) {
				id,
				name,
				supplier {
					id, name, address, country
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
					id, name
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
						price
					}
				}
				leadTimeValue,
				leadTimeUnit,
				sample,
				samplePrice
			}
		}
	`;

	static updateProduct = gql`
		mutation updateProduct($product: ProductInput!) {
			updateProduct(input: $product) {
				id
			}
		}
	`;
}
