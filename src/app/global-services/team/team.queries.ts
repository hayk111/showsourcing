import gql from 'graphql-tag';
import { GlobalQuery } from '~shared/global-services/_interfaces/global.query.interface';


export class TeamQueries implements GlobalQuery {
	one = gql`
		subscription teams($query: String!) {
			teams(query: $query) {
				id, name, realmPath, realmServerName
			}
		}
	`;

	list = gql`
		subscription teams($query: String!) {
			teams(query: $query) {
				id, name, realmPath, realmServerName
			}
		}
	`;

	create = gql`
		mutation createTeam($input: TeamInput!) {
			updateTeam(input: $input) {
				id, name, realmPath, realmServerName
			}
		}
	`;

	update = gql`
		mutation updateTeam($input: TeamInput!) {
			updateTeam(input: $input) {
				id,
			}
		}
	`;

	delete = gql`
		mutation deleteTeam($id: String!) {
			deleteTeam(id: $id)
		}
	`;

	all = (str: string) => gql`
			subscription teams {
			teams {
				${str}
			}
		}
	`;
}
