import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { from } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { environment } from 'environments/environment';
import { Observable, Observer, of, Subject, throwError } from 'rxjs';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { cleanTypenameLink } from '~core/apollo/services/clean.typename.link';
import { TokenState } from '~core/auth/interfaces/token-state.interface';
import { RealmServerService } from '~entity-services/realm-server/realm-server.service';
import { log, LogColor } from '~utils';
import { User as RealmUser } from 'realm-graphql-client';
import { GraphQLConfig } from 'realm-graphql-client';


/**
 * This is the abstract client containing utilities other client can use
 *
 * The client starting process is way more complicated than it should,
 * but I didn't choose it.
 */
export abstract class AbstractApolloClient {
	protected initialized = false;
	protected destroyed$ = new Subject();
	protected suffix = 'graphql-client';

	private ws: WebSocketLink;

	constructor(
		protected apollo: Apollo,
		protected httpLink: HttpLink,
		protected apolloState: ApolloStateService,
		protected realmServerSrv: RealmServerService,
		protected client: Client,
	) { }

	protected checkNotAlreadyInit() {
		if (this.initialized) {
			throw Error('client already initialized');
		}
		this.initialized = true;
	}

	/** resets a client */
	destroy(reason?: string): Observable<boolean> {
		log.debug(`%c Destroying client ${this.client} if it exists, reason: ${reason}`, LogColor.APOLLO_CLIENT_POST);
		this.apolloState.destroyClient(this.client);
		this.clearClient(this.client);
		this.destroyed$.next();
		this.initialized = false;
		return of(false);
	}

	setPending(reason?: string): Observable<boolean> {
		log.debug(`%c set client ${this.client} pending, reason: ${reason}`, LogColor.APOLLO_CLIENT_POST);
		this.clearClient(this.client);
		this.apolloState.setClientPending(this.client);
		return of(false);
	}

	protected onError(e) {
		this.apolloState.setClientError(this.client, e);
		return throwError(e);
	}

	/**
 	* to create the uri we need to concatena every parts we got from different DB's.
	*/
	protected getUri(port: number | string, hostName: string, path: string, isSecure = true): string {
		return `ws${isSecure ? 's' : ''}://${hostName}:${port}/graphql${path.startsWith('/') ? path : '/' + path}`;
	}

	/** we use the path as client name.. */
	protected async createClient(realmPath: string, user: RealmUser, name: Client): Promise<void> {
		const config = await GraphQLConfig.create(
			user,
			realmPath
		);
		log.debug(`%c 🌈creating client ${name}, path: ${realmPath}`, LogColor.APOLLO_CLIENT_PRE);
		const linker = new WebSocketLink({
			uri: config.webSocketEndpoint,
			options: {
				reconnect: true,
				connectionParams: config.connectionParams,
			}
		});

		const link = from([
			cleanTypenameLink,
			linker
		]);

		this.apollo.create({
			link,
			connectToDevTools: !environment.production,
			cache: new InMemoryCache({}),
			queryDeduplication: true,
		}, name);
	}

	protected clearClient(clientName?: string) {
		// the way apollo works is that for default client it's put in _client
		// the named clients are put in a map
		if (clientName)
			(this.apollo as any).map.delete(clientName);
		else
			delete (this.apollo as any)._client;

		// closing the websocket (as any) because property is private..
		if (this.ws && (this.ws as any).subscriptionClient)
			(this.ws as any).subscriptionClient.close();
	}
}

