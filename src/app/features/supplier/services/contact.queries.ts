import gql from 'graphql-tag';


export const SUPPLIER_CONTACT_QUERY = gql`
subscription supplierContacts($query: String!) {
	contacts(query: $query) {
    id,
    name,
    phoneNumber,
		email,
    jobTitle
    businessCardImage {
      fileName
    },
	}
}
`;

export const CREATE_CONTACT = gql`
	mutation createContact($input: ContactInput) {
		# using update so we can add a contact without creating a new supplier,
		# at the time of writing this it's not possible with the adaptator of realm
		updateContact(input: $input) {
			id
		}
	}
`;

export const UPDATE_CONTACT = gql`
	mutation updateContact($input: ContactInput) {
		# using update so we can add a contact without creating a new supplier,
		# at the time of writing this it's not possible with the adaptator of realm
		updateContact(input: $input) {
			id
		}
	}
`;

