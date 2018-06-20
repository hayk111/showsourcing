import gql from 'graphql-tag';


export class ClientQueries {
	static selectRealmHostName = gql`
		query realmServer($query: String!) {
			realmServers(query: $query) {
				hostname,
				httpsPort
			}
		}
	`;

}

