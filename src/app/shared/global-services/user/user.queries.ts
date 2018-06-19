import gql from 'graphql-tag';


export class UserQueries {
	static selectUser = gql`
		subscription users {
			users {
				id,
				firstName,
				lastName,
				phoneNumber,
				companyName,
				email,
				currentTeam,
				preferredLanguage,
			}
		}
	`;

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
