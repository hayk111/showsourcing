import gql from 'graphql-tag';


export class ClientInitializerQueries {
	static selectRealmHostName = gql`
		query realmServer($query: String!) {
			realmServers(query: $query) {
				hostname,
				httpsPort
			}
		}
	`;
}

