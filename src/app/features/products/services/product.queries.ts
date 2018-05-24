import gql from 'graphql-tag';

export class ProductQueries {
	static oneProduct = gql`
		subscription products($query: String!) {
			products(query: $query) {
				id,
				name,
				supplier {
					id, name, address, country
				},
				images {
					id, filename
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
					id, name, color, contrastColor
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
					id, label, price
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