import gql from 'graphql-tag';



export class CategoryQueries {
	// in order to subscribe to a category we need to
	// subscribe to the list and pass a query with the correct id so we
	// get a list of one element.
	static category = gql`
		subscription categories($query: String!) {
			suppliers(query: $query) {
				id,
				name
			}
		}`;

	static list = gql`
		query categories {
			categories(take: 30) {
				id,
				name,
				createdBy {
					id,
					firstName,
					lastName
				}
			}
		}`;

	static createCategory = gql`
		mutation addCategory($input: CategoryInput!) {
			addCategory(input: $input) {
				id
			}
		}
	`;

	static updateCategory = gql`
		mutation category($input: CategoryInput!) {
			updateCategory(input: $input) {
				id
			}
		}
	`;
}

