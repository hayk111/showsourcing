import gql from 'graphql-tag';


export class TeamQueries {

	static selectTeams = gql`
		subscription teams {
			teams {
				id,
				name,
				realmUri
			}
		}
	`;
}
