import { HttpHeaders } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { from, split, ApolloLink } from 'apollo-link';
import { Observable } from 'rxjs';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { first, map, switchMap } from 'rxjs/operators';
import { TokenService } from '~features/auth';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { cleanTypenameLink } from '~shared/apollo/services/clean.typename.link';
import { environment } from 'environments/environment.prod';
import { ClientInitializerQueries } from '~shared/apollo/services/client-queries';
import { log, LogColor } from '~utils';
import { ApolloStateService, ClientStatus } from '~shared/apollo/services/apollo-state.service';
import { TokenState } from '~features/auth/interfaces/token-state.interface';
import { Client } from '~shared/apollo/services/apollo-client-names.const';
import { filter } from 'rxjs/operators';
import { RealmServerService } from '~global-services/realm-server/realm-server.service';

export abstract class AbstractApolloClient {
	protected initialized = false;

	constructor(
		protected apollo: Apollo,
		protected httpLink: HttpLink,
		protected apolloState: ApolloStateService,
		protected realmServerSrv: RealmServerService
	) { }


	protected checkNotAlreadyInit() {
		if (this.initialized) {
			throw Error('User client already initialized');
		}
		this.initialized = true;
	}

	/** initialize apollo team client */
	protected async initClient(uri: string, name: Client, tokenState: TokenState) {
		try {
			this.createClient(uri, name, tokenState);
			this.apolloState.setClientReady(name);
		} catch (e) {
			log.error(e);
			this.apolloState.setClientError(name);
		}
	}

	/** resets a client */
	protected destroyClient(clientName: Client, reason = 'no refresh token') {
		log.debug(`%c Destroying client ${clientName} if it exists, reason: ${reason}`, LogColor.APOLLO_CLIENT_POST);
		this.apolloState.destroyClient(clientName);
		this.clearClient(clientName);
	}

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
		return this.apolloState.getClientStatus(Client.GLOBAL_CONSTANT).pipe(
			filter(status => status === ClientStatus.READY),
			// TODO: replace this with realmServerSrv.queryOne..
			switchMap(_ => this.apollo.use(Client.GLOBAL_CONSTANT).query({
				query: ClientInitializerQueries.selectRealmHostName,
				variables: { query: `name == "${realmName}"` }
			})),
			first(),
			map((r: any) => r.data.realmServers[0]),
			map(r => this.getUri(r.httpsPort, r.hostname, path))
		);
	}

	/** we use the path as client name.. */
	protected createClient(uri: string, name: Client, tokenState: TokenState) {
		log.debug(`%c creating client ${name}, uri: ${uri}`, LogColor.APOLLO_CLIENT_PRE);
		// Create a WebSocket link:
		const connectionParams = { token: tokenState.token };
		const ws = new WebSocketLink({
			uri,
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

	}

	protected clearClient(clientName?: string) {
		const base = this.apollo.use(clientName) || this.apollo;
		if (!base)
			return;

		const apolloClient = base.getClient();
		if (apolloClient)
			apolloClient.resetStore();
		// the way apollo works is that for default client it's put in _client
		// the named clients are put in a map
		if (clientName)
			(this.apollo as any).map.delete(clientName);
		else
			delete (this.apollo as any)._client;
	}
}

