import gql from 'graphql-tag';

export class SupplierQueries {

	create = gql`
		mutation addSupplier($input: SupplierInput!) {
			addSupplier(input: $input) {
				id
			}
		}
	`;

	update = gql`
		mutation supplier($input: SupplierInput!) {
			updateSupplier(input: $input) {
				id
			}
		}
	`;

	delete = gql`
		mutation supplier($input: String!) {
			deleteSupplier(id: $input)
		}
	`;

	all = (fields: string) => {
		return gql`
			subscription suppliers {
				suppliers {
					${fields}
				}
			}`;
	}
}
