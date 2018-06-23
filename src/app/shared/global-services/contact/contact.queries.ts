import { GlobalQuery } from '~shared/global-services/_interfaces/global.query.interface';
import gql from 'graphql-tag';

export class ContactQueries implements GlobalQuery {
	one = gql`
	subscription contacts($query: String!) {
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
	create = gql`
	mutation createContact($input: ContactInput) {
		# using update so we can add a contact without creating a new supplier,
		# at the time of writing this it's not possible with the adaptator of realm
		updateContact(input: $input) {
			id
		}
	}
	`;

	update = gql`
	mutation updateContact($input: ContactInput) {
		# using update so we can add a contact without creating a new supplier,
		# at the time of writing this it's not possible with the adaptator of realm
		updateContact(input: $input) {
			id
		}
	}`;

	delete = gql`
	mutation deleteContact($id: String!) {
		deleteContact(id: $id)
	}
	`;

	all = (str: string) => {
		return gql`
			subscription contacts {
				contacts{
					str
				}
			}
		`
	}

}