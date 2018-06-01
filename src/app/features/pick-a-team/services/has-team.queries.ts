import gql from 'graphql-tag';


export class HasTeamQueries {
	static getTeams = gql`
		subscription teams {
			teams {
				id,
				name
			}
		}
	`;
}
