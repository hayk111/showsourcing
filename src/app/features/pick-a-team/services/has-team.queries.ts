import gql from 'graphql-tag';


export class HasTeamQueries {
	static getTeams = gql`
		query teams {
			teams {
				id,
				name
			}
		}
	`;
}
