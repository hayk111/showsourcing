import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';

export class ProductStatusQueries implements GlobalQuery {

	one: any = gql`
	subscription productStatus($query: String!) {
		productStatuses(query: $query) {
			id,
			cancelled,
			status {
				id,
				name,
				inWorkflow,
				step,
				category
			}
		}
	}
	`;

	create = gql`
		mutation createProductStatus($input: ProductStatusInput!) {
			updateProductStatus(input: $input) {
				id
			}
		}
	`;

	update = gql`
		mutation updateProductStatus($input: ProductStatusInput!) {
			updateProductStatus(input: $input) {
				id
			}
		}
	`;

	deleteOne = gql`
		mutation deleteProductStatus($id: String!) {
			deleteProductStatus(id: $id)
		}
	`;

	deleteMany = gql`
		mutation deleteProductStatuses($query: String!) {
			deleteProductStatuses(query: $query)
		}
	`;

	all = (str: string) => gql`
		subscription productStatuses {
			productStatuses {
				${str}
			}
		}
	`
}
