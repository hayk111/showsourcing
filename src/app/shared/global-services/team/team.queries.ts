import gql from 'graphql-tag';


export class TeamQueries {

	static createTeam = gql`
	mutation createTeam($input: TeamInput!) {
		updateTeam(input: $input) {
			id, name, realmPath, realmServerName
		}
	}
`;

	static selectTeams = gql`
		subscription teams {
			teams {
				id,
				name,
				realmServerName,
				realmPath
			}
		}
	`;

	static selectTeamValid = gql`
		subscription teams($input: String!) {
			teams(query: $input) {
				id
			}
		}
	`;
}
