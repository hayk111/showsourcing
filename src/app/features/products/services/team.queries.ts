import gql from 'graphql-tag';

export class TeamQueries {
	static memberList = gql`
		query teamUsers {
			teamUsers {
				id,
				user {
					firstName,
					lastName
				}
			}
		}`;
}
