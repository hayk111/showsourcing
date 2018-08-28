import { HttpHeaders } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { from, split, ApolloLink } from 'apollo-link';
import { Observable } from 'rxjs';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { first, map } from 'rxjs/operators';
import { TokenService } from '~features/auth';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { cleanTypenameLink } from '~shared/apollo/services/clean.typename.link';
import { environment } from 'environments/environment.prod';
import { ClientInitializerQueries } from '~shared/apollo/services/client-queries';
import { GLOBAL_CONSTANT_CLIENT } from '~shared/apollo/services/apollo-client-names.const';
import { log, LogColor } from '~utils';

export abstract class AbstractApolloClient {
	protected clients = new Map();

	constructor(
		protected apollo: Apollo,
		protected httpLink: HttpLink,
	) { }

	/**
 	* to create the uri we need to concatena every parts we got from different DB's.
	*/
	protected getUri(port: number | string, hostName: string, path: string): string {
		return `wss://${hostName}:${port}/graphQL/${encodeURIComponent(path)}`;
	}

	/**
	 * gets a realm given a realm name
	 */
	protected getRealmUri(realmName: string, path?: string): Observable<string> {
		return this.apollo.use(GLOBAL_CONSTANT_CLIENT).subscribe({
			query: ClientInitializerQueries.selectRealmHostName,
			variables: { query: `name == "${realmName}"` }
		}).pipe(
			first(),
			map((r: any) => r.data.realmServers[0]),
			map(r => this.getUri(r.httpsPort, r.hostname, path))
		);
	}

	protected createClient(wsUri: string, name?: string, token?: string) {
		log.debug(`%c creating client ${name || 'default'}`, LogColor.APOLLO_CLIENT_PRE);
		// Create a WebSocket link:
		const connectionParams = (token ? { token } : undefined);
		const ws = new WebSocketLink({
			uri: wsUri,
			options: {
				reconnect: true,
				connectionParams
			}
		});


		const link = from([
			cleanTypenameLink,
			ws
		]);

		this.apollo.create({
			link,
			connectToDevTools: !environment.production,
			cache: new InMemoryCache({}),
			queryDeduplication: true
		}, name);

		// saving the client so we can clear it when logging out
		this.clients.set(name, this.apollo.use(name));

	}

	protected clearClient(clientName?: string) {
		log.debug(`%c clearing client ${clientName || 'default'}`, LogColor.APOLLO_CLIENT_POST);
		const base = this.apollo.use(clientName) || this.apollo;
		if (!base)
			return;

		const client = base.getClient();
		if (client)
			client.resetStore();
		// the way apollo works is that for default client it's put in _client
		// the named clients are put in a map
		if (clientName)
			(this.apollo as any).map.delete(clientName);
		else
			delete (this.apollo as any)._client;

	}
}

