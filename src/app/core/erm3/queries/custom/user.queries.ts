import gql from 'graphql-tag';

export class UserQueries {
	queryOne = gql`
		query GetUser($id: ID!) {
			user(id: $id) {
				id
				firstName
				lastName
			}
		}
	`;
}
