import gql from 'graphql-tag';
import {
	GlobalQuery
} from '../_global/global.query.interface';



export class InvitationQueries implements GlobalQuery {
	// at the time of writing this:
	// in order to subscribe to a supplier we need to
	// subscribe to the list and pass a query with the correct id so we
	// get a list of one element.

	one = gql`
		subscription invitation($query: String!) {
			invitations(query: $query) {
				id,
                email
			}
		}`;

	list = gql`
		subscription invitations(
			$take: Int,
			$skip: Int,
			$query: String!,
			$sortBy: String,
			$descending: Boolean
		) {
			invitations(query: $query, take: $take, skip: $skip, sortBy: $sortBy, descending: $descending) {
				id,
				email
			}
		}`;

	create = gql`
        mutation createInvitation($input: InvitationInput!) {
            updateInvitation(input: $input) {
                id
            }
        }
    `;

	update = gql`
		mutation invitation($input: InvitationInput!) {
			updateInvitation(input: $input) {
				id
			}
		}
	`;

	deleteOne = gql`
		mutation invitation($id: String!) {
			deleteInvitation(id: $id)
		}
	`;

	deleteMany = gql`
		mutation invitations($query: String!) {
			deleteInvitations(query: $query)
		}
    `;

	all = (str: string) => {
		return gql`
		subscription invitations {
			invitations {
				${str}
			}
		}
	`;
	}

}
