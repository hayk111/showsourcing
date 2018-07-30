import gql from 'graphql-tag';
import { GlobalQuery } from '~global-services/_global/global.query.interface';


export class TeamQueries implements GlobalQuery {
	one = gql`
		subscription teams($query: String!) {
			teams(query: $query) {
				id, name, realmPath, realmServerName, ownerUser { id, firstName, lastName }, status
			}
		}
	`;

	list = gql`
		subscription teams($query: String!) {
			teams(query: $query) {
				id, name, realmPath, realmServerName, ownerUser { id, firstName, lastName }, status
			}
		}
	`;

	create = gql`
		mutation createTeam($input: TeamInput!) {
			updateTeam(input: $input) {
				id, name, realmPath, realmServerName, status
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

	deleteOne = gql`
		mutation deleteTeam($id: String!) {
			deleteTeam(id: $id)
		}
	`;

	deleteMany = gql`
		mutation deleteTeams($query: String!) {
			deleteTeams(query: $query)
		}
	`;

	all = (str: string) => gql`
			subscription teams {
			teams {
				id, name, realmPath, realmServerName, status, ownerUser { id, firstName, lastName }
			}
		}
	`
}
