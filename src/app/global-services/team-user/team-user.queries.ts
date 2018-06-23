import { GlobalQuery } from '~shared/global-services/_interfaces/global.query.interface';
import gql from 'graphql-tag';

export class TeamUserQueries implements GlobalQuery {

	one: any = gql`
	subscription teamUser($query: String!) {
		teamUsers(query: $query) {
			id, name
		}
	}
	`;

	create = gql`
		mutation createTeamUser($input: TeamUserInput!) {
			updateTeamUser(input: $input) {
				id, name
			}
		}
	`;

	update = gql`
		mutation updateTeamUser($input: TeamUserInput!) {
			updateTeamUser(input: $input) {
				id, name
			}
		}
	`;

	delete = gql`
		mutation deleteTeamUser($input: String!) {
			deleteTeamUser(id: $input)
		}
	`;

	all = (str: string) => gql`
		subscription teamUsers {
			teamUsers {
				${str}
			}
		}
	`;

}
