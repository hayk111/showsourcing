import gql from 'graphql-tag';

export class ProductFeatureQueries {
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
