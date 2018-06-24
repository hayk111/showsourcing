import gql from 'graphql-tag';
import { GlobalQuery } from '../_global/global.query.interface';


export class UserQueries implements GlobalQuery {
	one = gql`
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

	create = gql`
		mutation createUser($input: UserInput) {
			updateUser(input: $input) {
				id
			}
		}
	`;

	update = gql`
		mutation updateUser($input: UserInput) {
			updateUser(input: $input) {
				id
			}
		}
	`;

	deleteOne = gql`
		mutation updateUser($id: String) {
			deleteUser(id: $id)
		}
	`;

	deleteMany = gql`
		mutation updateUser($id: String) {
			deleteUser(id: $id)
		}
	`;

	all = (str: string) => gql`
		subscription users {
			users {
				${str}
			}
		}
	`;

}
