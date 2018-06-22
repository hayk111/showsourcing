import gql from 'graphql-tag';



export class CategoryQueries {

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
