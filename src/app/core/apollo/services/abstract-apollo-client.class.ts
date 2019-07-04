import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { from } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { environment } from 'environments/environment';
import gql from 'graphql-tag';
import { GraphQLConfig, User as RealmUser } from 'realm-graphql-client';
import { Observable, of, Subject, throwError } from 'rxjs';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { cleanTypenameLink } from '~core/apollo/services/clean.typename.link';
import { RealmServerService } from '~entity-services/realm-server/realm-server.service';
import { log, LogColor } from '~utils';
import { showsourcing } from '~utils/debug-object.utils';


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
	) {
		// for debugging purpose
		if (!showsourcing.clients)
			showsourcing.clients = new Map<string, any>();
		if (!showsourcing.gql)
			showsourcing.gql = gql;
	}

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

		// by default the fetchPolicy is 'cache-first', this means that if a query that has been done in the past
		// with the same parameters, it will look at the cache instead of waiting for network response,
		// we use 'cache-and-network' since first it looks at the cache and regardless of whether any data was found,
		// it passes the query along to the APi to get the most up-to-date data.
		// https://medium.com/@galen.corey/understanding-apollo-fetch-policies-705b5ad71980
		this.apollo.create({
			link,
			connectToDevTools: !environment.production,
			cache: new InMemoryCache({}),
			queryDeduplication: true,
			defaultOptions: {
				watchQuery: {
					fetchPolicy: 'cache-and-network'
				}
			}
		}, name);

		showsourcing.clients.set(name, this.apollo.use(name));
	}

	// https://github.com/apollographql/apollo-angular/issues/736
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

