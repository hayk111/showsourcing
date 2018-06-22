import gql from 'graphql-tag';

export class ProductQueries {

	create = gql`
		mutation addProduct($input: ProductInput!) {
			addProduct(input: $input) {
				id
			}
		}
	`;

	update = gql`
		mutation product($input: ProductInput!) {
			updateProduct(input: $input) {
				id
			}
		}
	`;

	delete = gql`
		mutation product($input: String!) {
			deleteProduct(id: $input)
		}
	`;

	all = (fields: string) => {
		return gql`
			subscription products {
				products {
					${fields}
				}
			}`;
	}
}
