import gql from 'graphql-tag';


export class ClientQueries {
	// we have to query all users
	static selectUsers = gql`
		query users {
			users {
				id,
				userRealmUri
			}
		}
	`;
}

