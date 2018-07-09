import gql from 'graphql-tag';


export class ClientInitializerQueries {
	static selectRealmHostName = gql`
		subscription realmServer($query: String!) {
			realmServers(query: $query) {
				hostname,
				httpsPort
			}
		}
	`;

	static selectUser = gql`
		subscription users($query: String!) {
			users(query: $query) {
				id,
				realmServerName,
				realmPath
			}
		}
	`;

	static allTeams = gql`
		subscription teams {
			teams {
				id, name, realmPath, realmServerName
			}
		}
	`;

	static teamList = gql`
		subscription teams($query: String!) {
			teams(query: $query) {
				id, name, realmPath, realmServerName
			}
		}
	`;
}

