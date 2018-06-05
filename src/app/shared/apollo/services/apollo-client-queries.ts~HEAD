import gql from 'graphql-tag';


export class ClientQueries {
	// we have to query all users
	static selectUser = gql`
		query user($id: String!) {
			user(id: $id) {
				userRealmUri
			}
		}
	`;

	static selectTeams = gql`
		subscription teams {
			teams {
				id,
				realmUri
			}
		}
	`;
}

