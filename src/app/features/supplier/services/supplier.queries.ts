import gql from 'graphql-tag';

export const SUPPLIER_QUERY = gql`
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
		audit {
			creationDate
			createdBy {
				lastName,
				firstName
			}
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
	},
	# relations that don't figure on the supplier
	# comments are not yet added to backend
	# tasks are not yet added to backend
}
`;

export const SUPPLIER_PRODUCT_QUERY = gql`
subscription supplierProducts($query: String!) {
	products(query: $query) {
		id,
		name,
		images {
			fileName
		}
	}
}
`;


export const SUPPLIER_LIST_QUERY = gql`
subscription suppliers {
	suppliers {
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
		},

	}
}`;

export const EDIT_SUPPLIER_QUERY = gql`
	mutation supplier($supplier: SupplierInput!) {
		updateSupplier(input: $supplier) {
			id
		}
	}
`;

export const CREATE_SUPPLIER_QUERY = gql`
	mutation addSupplier($supplier: SupplierInput!) {
		addSupplier(input: $supplier) {
			id
		}
	}
`;

