import gql from 'graphql-tag';


export class TeamQueries {

	create = gql`
	mutation CreateTeam($input: CreateTeamInput!) {
		createTeam(input: $input) {
			id name
		}
	}
	`;

	queryAll = gql`
		query ListTeams {
			listTeams {
				items {
					id
					name
				}
			}
		}
	`;
}
