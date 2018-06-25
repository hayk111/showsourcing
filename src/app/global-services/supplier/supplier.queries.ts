import gql from 'graphql-tag';
import {
	GlobalQuery
} from '../_global/global.query.interface';



export class SupplierQueries implements GlobalQuery {
	// at the time of writing this:
	// in order to subscribe to a supplier we need to
	// subscribe to the list and pass a query with the correct id so we
	// get a list of one element.
	one = gql`
		subscription supplier($query: String!) {
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
				taskCount,
				creationDate,
				logoImage {
					fileName
				},
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

	list = gql`
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
				creationDate,
				createdBy {
					firstName,
					lastName
				}
			}
		}`;


	create = gql`
		mutation addSupplier($input: SupplierInput!) {
			updateSupplier(input: $input) {
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

	deleteOne = gql`
		mutation supplier($id: String!) {
			deleteSupplier(id: $id)
		}
	`;

	deleteMany = gql`
		mutation suppliers($query: String!) {
			deleteSuppliers(query: $query)
		}
	`;

	all = (str: string) => {
		return gql`
		subscription suppliers {
			suppliers {
				${str}
			}
		}
	`;
	}

}

