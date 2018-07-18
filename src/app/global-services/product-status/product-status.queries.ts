import { GlobalQuery } from '../_global/global.query.interface';
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
		mutation updateProductStatus($input: ProductStatusInput!) {
			updateProductStatus(input: $input) {
				id, name
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
