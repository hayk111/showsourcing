import { HttpHeaders } from '@angular/common/http';
import { Apollo, ApolloBase } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { from, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { distinctUntilChanged, filter, first, map } from 'rxjs/operators';
import { TokenService } from '~features/auth';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { GLOBAL_CLIENT, USER_CLIENT } from '~shared/apollo/services/apollo-endpoints.const';
import { cleanTypenameLink } from '~shared/apollo/services/clean.typename.link';
import { ClientInitializerQueries } from '~shared/apollo/services/initializers/initializer-queries';

export abstract class AbstractInitializer {
	protected clients = new Map();

	constructor(
		protected apollo: Apollo,
		protected tokenSrv: TokenService,
		protected httpLink: HttpLink,
		protected authSrv: AuthenticationService,
		protected clearOnLogout: boolean
	) {

		if (this.clearOnLogout) {
			// when unauthenticated we clear the cache
			this.authSrv.authState$.pipe(
				map(state => state.authenticated),
				distinctUntilChanged(),
				filter(auth => !auth)
			).subscribe(_ => this.clearCache());
		}

	}

	/**
 	* to create the uri we need to concatena every parts we got from different DB's.
	*/
	protected getUris(port: number | string, hostName: string, path: string): { httpUri: string, wsUri: string } {
		const httpUri = `https://${hostName}:${port}/graphQL/${encodeURIComponent(path)}`;
		// uri for websocket
		const wsUri = `wss://${hostName}:${port}/graphQL/${encodeURIComponent(path)}`;
		return { httpUri: httpUri.toString(), wsUri: wsUri.toString() };
	}

	/**
	 * gets a realm given a realm name
	 */
	protected async getRealm(realmName: string): Promise<{ hostname: string, httpsPort: string }> {
		return this.apollo.use(GLOBAL_CLIENT).subscribe({
			query: ClientInitializerQueries.selectRealmHostName,
			variables: { query: `name == "${realmName}"` }
		}).pipe(
			first(),
			map((r: any) => r.data.realmServers[0])
		).toPromise();
	}

	protected createClient(httpUri: string, wsUri: string, name?: string) {
		// Create an http link:
		let token;
		let headers;
		if (this.tokenSrv.accessTokenSync) {
			token = this.tokenSrv.accessTokenSync.token;
			headers = new HttpHeaders({ Authorization: token });
		}

		const http = this.httpLink.create({
			uri: httpUri,
			headers
		});

		// Create a WebSocket link:
		const connectionParams = (token ? { token } : undefined);
		const ws = new WebSocketLink({
			uri: wsUri,
			options: {
				reconnect: true,
				connectionParams
			}
		});

		// using the ability to split links, you can send data to each link
		// depending on what kind of operation is being sent
		const transportLink = split(
			// split based on operation type
			({ query }) => {
				const { kind, operation } = getMainDefinition(query) as any;
				return kind === 'OperationDefinition' && operation === 'subscription';
			},
			ws,
			http,
		);

		const link = from([
			cleanTypenameLink,
			transportLink
		]);

		this.apollo.create({
			link,
			connectToDevTools: true,
			cache: new InMemoryCache({})
		}, name);

		// saving the client so we can clear it when logging out
		this.clients.set(name, this.apollo.use(name));

	}

	protected clearCache() {
		for (const client of this.clients.values())
			this.clearClient(client);
	}

	protected clearClient(base: ApolloBase<any> | any) {
		if (!base)
			return;
		if (base.map)
			base.map.delete(USER_CLIENT);
		if (base._client)
			delete base._client;
		const client = base.getClient();
		if (client)
			client.resetStore();
	}
}

