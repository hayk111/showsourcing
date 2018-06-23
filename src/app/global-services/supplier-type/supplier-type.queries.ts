import { GlobalQuery } from '~shared/global-services/_interfaces/global.query.interface';
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

	delete = gql`
		mutation deleteSupplierType($input: String!) {
			deleteSupplierType(id: $input)
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
