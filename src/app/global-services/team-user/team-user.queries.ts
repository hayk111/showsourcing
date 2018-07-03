import { GlobalQuery } from '../_global/global.query.interface';
import gql from 'graphql-tag';

export class TeamUserQueries implements GlobalQuery {

	list: any = gql`
	subscription teamUsers(
		$take: Int,
		$skip: Int,
		$query: String!,
		$sortBy: String,
		$descending: Boolean
	) {
		teamUsers(query: $query, take: $take, skip: $skip, sortBy: $sortBy, descending: $descending) {
			id,
			user {
				id,
				firstName,
				lastName,
				email
			},
			status,
			accessType
		}
	}
	`;

	one: any = gql`
	subscription teamUser($query: String!) {
		teamUsers(query: $query) {
			user {
				id, name
			}

		}
	}
	`;

	create = gql`
		mutation createTeamUser($input: TeamUserInput!) {
			updateTeamUser(input: $input) {
				id
			}
		}
	`;

	update = gql`
		mutation updateTeamUser($input: TeamUserInput!) {
			updateTeamUser(input: $input) {
				id
			}
		}
	`;

	deleteOne = gql`
		mutation deleteTeamUser($id: String!) {
			deleteTeamUser(id: $id)
		}
	`;

	deleteMany = gql`
		mutation deleteTeamUsers($query: String!) {
			deleteTeamUser(query: $query)
		}
	`;

	all = (str: string) => gql`
		subscription teamUsers {
			teamUsers {
				${str}
			}
		}
	`

}
