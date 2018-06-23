import { GlobalQuery } from '~shared/global-services/_interfaces/global.query.interface';
import gql from 'graphql-tag';

export class ProductStatusQueries implements GlobalQuery {

	one: any = gql`
	subscription productStatus($query: String!) {
		productStatuses(query: $query) {
			id, name
		}
	}
	`;

	create = gql`
		mutation createProductStatus($input: ProductStatusInput!) {
			updateProductStatus(input: $input) {
				id, name
			}
		}
	`;

	update = gql`
		mutation updateProductStatus($input: ProductInput!) {
			updateProductStatus(input: $input) {
				id, name
			}
		}
	`;

	delete = gql`
		mutation deleteProductStatus($input: String!) {
			deleteProductStatus(id: $input)
		}
	`;

	all = (str: string) => gql`
		subscription productStatuses {
			productStatuses {
				${str}
			}
		}
	`;

}
