import gql from "graphql-tag";

export class SupplierListQueries {
	static list = gql`
		subscription suppliers {
			suppliers(take: 30) {
				id,
				name,
				description,
				country,
				favorite,
				tags {
					id,
					name
				},
				categories {
					id,
					name
				},
				audit {
					creationDate,
					createdBy {
						firstName,
						lastName
					}
				}
			}
		}`;

	static updateSupplier = gql`
		mutation supplier($supplier: SupplierInput!) {
			updateSupplier(input: $supplier) {
				id
			}
		}`;
}