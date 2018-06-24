import { GlobalQuery } from '../_global/global.query.interface';
import gql from 'graphql-tag';

export class SupplierTypeQueries implements GlobalQuery {

	one: any = gql`
	subscription supplierType($query: String!) {
		supplierTypes(query: $query) {
			id, name
		}
	}
	`;

	create = gql`
		mutation createSupplierType($input: SupplierTypeInput!) {
			updateSupplierType(input: $input) {
				id, name
			}
		}
	`;

	update = gql`
		mutation updateSupplierType($input: SupplierTypeInput!) {
			updateSupplierType(input: $input) {
				id, name
			}
		}
	`;

	deleteOne = gql`
		mutation deleteSupplierType($id: String!) {
			deleteSupplierType(id: $id)
		}
	`;

	deleteMany = gql`
		mutation deleteSupplierTypes($query: String!) {
			deleteSupplierTypes(query: $query)
		}
	`;

	all = (str: string) => gql`
		subscription supplierTypes {
			supplierTypes {
				${str}
			}
		}
	`;

}
