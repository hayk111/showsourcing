import gql from 'graphql-tag';



export class SupplierQueries {
	// at the time of writing this:
	// in order to subscribe to a supplier we need to
	// subscribe to the list and pass a query with the correct id so we
	// get a list of one element.
	static supplier = gql`
		subscription suppliers($query: String!) {
			suppliers(query: $query) {
				id,
				name,
				description,
				website,
				phoneNumber,
				country,
				address,
				officeEmail,
				officePhone,
				incoTerm,
				harbour,
				favorite,
				generalMOQ,
				generalLeadTime,
				productCount,
				creationDate
				createdBy {
						lastName,
						firstName
				},
				status {
					id,
					name,
					color,
					contrastColor
				}
				categories {
					id,
					name
				}
				supplierType {
					id,
					name
				},
				images {
					fileName,
					orientation
				},
				tags {
					id,
					name
				}
			}
		}`;

	static list = gql`
		query suppliers {
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
				creationDate,
				createdBy {
					firstName,
					lastName
				}
			}
		}`;

	static latestProducts = gql`
			subscription supplierProducts($query: String!) {
				products(query: $query, take: 7, sortBy: "creationDate", desc: true) {
					id,
					name,
					images {
						fileName
					}
				}
			}`;

	static createSupplier = gql`
			mutation addSupplier($supplier: SupplierInput!) {
				addSupplier(input: $supplier) {
					id
				}
			}
		`;

	static updateSupplier = gql`
			mutation supplier($supplier: SupplierInput!) {
				updateSupplier(input: $supplier) {
					id
				}
			}
		`;
}

