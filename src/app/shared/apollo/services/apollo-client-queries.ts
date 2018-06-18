import gql from 'graphql-tag';


export class ClientQueries {
	// we have to query all users
	static selectUser = gql`
		query user($id: String!) {
			user(id: $id) {
				realmServerName,
				realmPath
			}
		}
	`;

	static selectTeams = gql`
		subscription teams {
			teams(query: "status == 'valid'") {
				id,
				realmPath,
				realmServerName
			}
		}
	`;

	static selectRealmHostName = gql`
		query realmServer($query: String!) {
			realmServers(query: $query) {
				hostname,
				httpsPort
			}
		}
	`;

}

