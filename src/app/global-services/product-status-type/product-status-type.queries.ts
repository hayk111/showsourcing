import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';

export class ProductStatusTypeQueries implements GlobalQuery {

	one: any = gql`
	subscription productStatusType($query: String!) {
		productStatusType(query: $query) {
			id, name
		}
	}
	`;

	create = gql`
		mutation createProductStatusType($input: ProductStatusInput!) {
			updateProductStatusType(input: $input) {
				id, name
			}
		}
	`;

	update = gql`
		mutation updateProductStatusType($input: ProductStatusTypeInput!) {
			updateProductStatusType(input: $input) {
				id, name
			}
		}
	`;

	deleteOne = gql`
		mutation deleteProductStatusType($id: String!) {
			deleteProductStatusType(id: $id)
		}
	`;

	deleteMany = gql`
		mutation deleteProductStatusTypes($query: String!) {
			deleteProductStatusTypes(query: $query)
		}
	`;

	all = (str: string) => gql`
		subscription productStatusTypes {
			productStatusTypes {
				${str}
			}
		}
	`
}
