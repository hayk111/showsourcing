import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { from } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { environment } from 'environments/environment';
import { Observable, Observer, Subject, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { TokenState } from '~core/auth/interfaces/token-state.interface';
import { RealmServerService } from '~global-services/realm-server/realm-server.service';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { cleanTypenameLink } from '~core/apollo/services/clean.typename.link';
import { log, LogColor } from '~utils';


/**
 * This is the abstract client containing utilities other client can use
 *
 * The client starting process is way more complicated than it should,
 * but I didn't choose it.
 */
export abstract class AbstractApolloClient {
	protected initialized = false;
	protected destroyed$ = new Subject();

	private ws: WebSocketLink;

	constructor(
		protected apollo: Apollo,
		protected httpLink: HttpLink,
		protected apolloState: ApolloStateService,
		protected realmServerSrv: RealmServerService,
		protected client: Client
	) { }

	protected checkNotAlreadyInit() {
		if (this.initialized) {
			throw Error('client already initialized');
		}
		this.initialized = true;
	}

	/** initialize apollo team client */
	protected initClient(uri: string, name: Client, tokenState: TokenState) {
		try {
			this.createClient(uri, name, tokenState);
			this.apolloState.setClientReady(name);
		} catch (e) {
			this.apolloState.setClientError(name, e);
		}
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
		return of(e);
	}

	/**
 	* to create the uri we need to concatena every parts we got from different DB's.
	*/
	protected getUri(port: number | string, hostName: string, path: string, isSecure = true): string {
		return `ws${isSecure ? 's' : ''}://${hostName}:${port}/graphql${path.startsWith('/') ? path : '/' + path}`;
	}

	/**
	 * gets a realm given a realm name
	 */
	protected getRealmUri(realmName: string, path?: string): Observable<string> {
		return this.realmServerSrv.queryOneByPredicate(`name == "${realmName}"`).pipe(
			first(),
			map(r => {
				const port = r.httpsPort || r.httpPort;
				const isSecure = !!r.httpsPort;
				return this.getUri(port, r.hostname, path, isSecure);
			})
		);
	}

	/** we use the path as client name.. */
	protected createClient(uri: string, name: Client, tokenState: TokenState): Observable<Client> {
		log.debug(`%c 🌈creating client ${name}, uri: ${uri}`, LogColor.APOLLO_CLIENT_PRE);

		return Observable.create((observer: Observer<any>) => {
			const connectionCallback = (error) => {
				if (error) {
					observer.error(error);
				} else {
					observer.next(name);
					observer.complete();
				}
			};
			// Create a WebSocket link:
			const connectionParams = { token: tokenState.token };
			this.ws = new WebSocketLink({
				uri,
				options: {
					reconnect: true,
					connectionParams,
					connectionCallback
				}
			});

			const link = from([
				cleanTypenameLink,
				this.ws
			]);

			this.apollo.create({
				link,
				connectToDevTools: !environment.production,
				cache: new InMemoryCache({}),
				queryDeduplication: true
			}, name);
		});

		// need to reset the store so it doesn't have previous data
		// const cli = this.apollo.use(name).getClient().resetStore();
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

