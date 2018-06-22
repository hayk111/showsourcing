import gql from 'graphql-tag';
import { GlobalQuery } from '~shared/global-services/_interfaces/global.query.interface';

export class CategoryQueries implements GlobalQuery {

	create = gql`
		mutation addCategory($input: CategoryInput!) {
			addCategory(input: $input) {
				id
			}
		}
	`;

	update = gql`
		mutation category($input: CategoryInput!) {
			updateCategory(input: $input) {
				id
			}
		}
	`;

	delete = gql`
		mutation category($input: String!) {
			deleteCategory(id: $input)
		}
	`;

	all = (fields: string) => {
		return gql`
			subscription categories {
				categories {
					${fields}
				}
			}`;
	}
}
