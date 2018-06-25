import { GlobalQuery } from '../_global/global.query.interface';
import gql from 'graphql-tag';

export class TeamUserQueries implements GlobalQuery {

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
