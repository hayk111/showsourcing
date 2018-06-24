import { GlobalQuery } from '../_interfaces/global.query.interface';
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

	update = gql`
		mutation updateCategory($input: CategoryInput!) {
			updateCategory(input: $input) {
				id, name
			}
		}
	`;

	delete = gql`
		mutation deleteCategory($input: String!) {
			deleteCategory(id: $input)
		}
	`;

	deleteMany = gql`
		mutation deleteCategories($query: String!) {
			deleteCategories(query: $query)
		}
	`

	all = (str: string) => gql`
		subscription categories {
			categories {
				${str}
			}
		}
	`;

}
