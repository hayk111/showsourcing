import { GlobalQuery } from '../_global/global.query.interface';
import gql from 'graphql-tag';

export class SupplierStatusQueries implements GlobalQuery {

	one: any = gql`
	subscription supplierStatus($query: String!) {
		supplierStatuses(query: $query) {
			id, name
		}
	}
	`;

	create = gql`
		mutation createSupplierStatus($input: SupplierStatusInput!) {
			updateSupplierStatus(input: $input) {
				id, name
			}
		}
	`;

	update = gql`
		mutation updateSupplierStatus($input: SupplierStatusInput!) {
			updateSupplierStatus(input: $input) {
				id, name
			}
		}
	`;

	deleteOne = gql`
		mutation deleteSupplierStatus($id: String!) {
			deleteSupplierStatus(id: $id)
		}
	`;

	deleteMany = gql`
		mutation deleteSupplierStatuses($query: String!) {
			deleteSupplierStatuses(query: $query)
		}
	`;

	all = (str: string) => gql`
		subscription supplierStatuses {
			supplierStatuses {
				${str}
			}
		}
	`;

}
