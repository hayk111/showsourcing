import gql from 'graphql-tag';



export class MemberQueries {
	// at the time of writing this:
	// in order to subscribe to a member we need to
	// subscribe to the list and pass a query with the correct id so we
	// get a list of one element.
	static member = gql`
		subscription teamUsers($query: String!) {
			teamUsers(query: $query) {
				id,
				user {
					firstName,
					lastName,
					email
				},
				status,
				accessType
			}
		}`;

	static list = gql`
		query teamUsers {
			teamUsers(take: 30) {
				id,
				user {
					firstName,
					lastName,
					email
				},
				status,
				accessType
			}
		}`;

	static updateMember = gql`
		mutation teamUsers($input: TeamUserInput!) {
			updateTeamUser(input: $input) {
				id
			}
		}
	`;

	static deleteMember = gql`
		mutation teamUsers($input: TeamUserInput!) {
		deleteTeamuser(input: $input) {
				id
			}
		}
	`;
}

