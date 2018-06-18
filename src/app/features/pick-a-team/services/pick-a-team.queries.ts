import gql from 'graphql-tag';


export class PickATeamQueries {
	static selectTeams = gql`
		subscription teams {
			teams {
				id,
				name
			}
		}
	`;

	static createTeam = gql`
		mutation createTeam($input: TeamInput!) {
			updateTeam(input: $input) {
				id, name
			}
		}
	`;
}
