import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';

export class SupplierStatusTypeQueries implements GlobalQuery {

	one: any = gql`
	subscription supplierStatusType($query: String!) {
		supplierStatusType(query: $query) {
			id, name
		}
	}
	`;

	create = gql`
		mutation createSupplierStatusType($input: SupplierStatusInput!) {
			updateSupplierStatusType(input: $input) {
				id, name
			}
		}
	`;

	update = gql`
		mutation updateSupplierStatusType($input: SupplierStatusTypeInput!) {
			updateSupplierStatusType(input: $input) {
				id, name
			}
		}
	`;

	deleteOne = gql`
		mutation deleteSupplierStatusType($id: String!) {
			deleteSupplierStatusType(id: $id)
		}
	`;

	deleteMany = gql`
		mutation deleteSupplierStatusTypes($query: String!) {
			deleteSupplierStatusTypes(query: $query)
		}
	`;

	all = (str: string) => gql`
		subscription supplierStatusTypes {
			supplierStatusTypes {
				${str}
			}
		}
	`
}
