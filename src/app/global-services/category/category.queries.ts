import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';

export class CategoryQueries implements GlobalQuery {

	one: any = gql`
	subscription category($query: String!) {
		categories(query: $query) {
			id, name
		}
	}
	`;

	create = gql`
		mutation createCategory($input: CategoryInput!) {
			updateCategory(input: $input) {
				id, name
			}
		}
	`;

	many = gql`
	subscription categories(
		$take: Int,
		$skip: Int,
		$query: String!,
		$sortBy: String,
		$descending: Boolean
		) {
		categories(query: $query, take: $take, skip: $skip, sortBy: $sortBy, descending: $descending) {
		id,
		name,
			createdBy {
				id,
				firstName,
				lastName
			}
		}
	}
`;

	update = gql`
		mutation updateCategory($input: CategoryInput!) {
			updateCategory(input: $input) {
				id, name
			}
		}
	`;

	deleteOne = gql`
		mutation deleteCategory($id: String!) {
			deleteCategory(id: $id)
		}
	`;

	deleteMany = gql`
		mutation deleteCategories($query: String!) {
			deleteCategories(query: $query)
		}
	`;

	all = (str: string) => gql`
		subscription categories {
			categories {
				${str}
			}
		}
	`
}
