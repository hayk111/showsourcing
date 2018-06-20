import gql from 'graphql-tag';


export class UserQueries {
	static selectUser = gql`
		subscription users($query: String!) {
			users(query: $query) {
				id,
				firstName,
				lastName,
				email,
				realmServerName,
				realmPath
			}
		}
	`;

	static queryUser = gql`
		query user($id: String!) {
			user(id: $id) {
				id,
				firstName,
				lastName,
				email,
				realmServerName,
				realmPath
			}
		}
`;


}
