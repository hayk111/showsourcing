import { CustomQueries } from '../_global/query-builder-2.class';



export const customQueries: CustomQueries = {

	create: `
	mutation CreateTeam($input: CreateTeamInput!) {
		createTeam(input: $input) {
			id name
		}
	}
	`,
	queryAll: `
		query ListTeams {
			listTeams {
				items {
					id
					name
				}
			}
		}
	`,
};

