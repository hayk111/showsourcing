import { HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, ApolloBase } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { from, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { environment } from 'environments/environment';
import { filter, map, tap, take } from 'rxjs/operators';
import { TokenService } from '~features/auth/services/token.service';
import { UserService, TeamService } from '~shared/global-services';
import { Team, User } from '~models';
import { ClientQueries } from '~shared/apollo/services/apollo-client-queries';
import {
	ALL_USER_CLIENT,
	GLOBAL_CLIENT,
	USER_CLIENT,
} from '~shared/apollo/services/apollo-endpoints.const';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';
import { cleanTypenameLink } from '~shared/apollo/services/clean.typename.link';
import { Log } from '~utils/logger';


/**
 * This class starts the apollo client.
 *
 * To start the team client we are going through like 3 other clients
 * First we go to all-user then global then user then team. Yeah, this wasn't my choice.
 */
@Injectable({
	providedIn: 'root'
})
export class ApolloService {
	private static initialized = false;

	constructor(
		private apollo: Apollo,
		private apolloState: ApolloStateService,
		private userSrv: UserService,
		private teamSrv: TeamService,
		private tokenSrv: TokenService,
		private httpLink: HttpLink,
		private router: Router
	) { }

	init() {
		if (ApolloService.initialized) {
			throw Error('Apollo has already been initialized, check that there is only one instance running');
		}
		this.initGlobalClients();

		// when unauthenticated we clear the cache
		// when the user is connected (we can have an user id)
		this.userSrv.user$.subscribe(user => {
			if (user)
				this.initUserClient(user);
			else
				this.clearCache();
		});

		// when the the user has selected a team we initialize the team client
		this.teamSrv.selectedTeam$
			.pipe(
				// if the team is null then we should do nothing because we are already redirecting in getSelectedTeam
				filter(t => !!t)
			)
			.subscribe(team => this.initTeamClient(team));
	}

	/** creates global and all-users clients */
	private async initGlobalClients() {
		try {
			// 1. creating all-users client and getting the user
			this.createAllUserClient();
			this.createGlobalClient();
			this.apolloState.setGlobalClientsReady();
		} catch (e) {
			Log.error(e);
			this.apolloState.setGlobalClientsNotReady();
			this.router.navigate(['server-issue']);
		}
	}

	/** create the user client  */
	private async initUserClient(user: User) {
		try {
			this.clearClient(this.apollo.use(USER_CLIENT));
			const realm = await this.getRealm(user.realmServerName);
			const userUris = this.getUris(realm.httpsPort, realm.hostname, user.realmPath);
			this.createUserClient(userUris.httpUri, userUris.wsUri);
			this.apolloState.setUserClientReady();
		} catch (e) {
			Log.error(e);
			this.apolloState.setUserClientNotReady();
			this.router.navigate(['server-issue']);
		}
	}

	private async initTeamClient(team: Team) {

		try {
			// we first clear the last team picked cache
			this.clearClient(this.apollo);
			const realm = await this.getRealm(team.realmServerName);
			const uris = this.getUris(realm.httpsPort, realm.hostname, team.realmPath);
			this.createTeamClient(uris.httpUri, uris.wsUri);
			this.apolloState.setTeamClientReady();
		} catch (e) {
			Log.error(e);
			this.router.navigate(['server-issue']);
			this.apolloState.setTeamClientNotReady();
		}
	}

	/**
	 * to create the uri we need to concatena every parts we got from different DB's.
	*/
	private getUris(port: number | string, hostName: string, path: string): { httpUri: string, wsUri: string } {
		const httpUri = `https://${hostName}:${port}/graphQL/${encodeURIComponent(path)}`;
		// uri for websocket
		const wsUri = `wss://${hostName}:${port}/graphQL/${encodeURIComponent(path)}`;
		return { httpUri: httpUri.toString(), wsUri: wsUri.toString() };
	}

	/**
	 * gets a realm given a realm name
	 */
	private async getRealm(realmName: string): Promise<{ hostname: string, httpsPort: string }> {
		return this.apollo.use(GLOBAL_CLIENT).subscribe({
			query: ClientQueries.selectRealmHostName,
			variables: { query: `name == "${realmName}"` }
		}).pipe(
			take(1),
			map((r: any) => r.data.realmServers[0])
		).toPromise();
	}

	/** creates the client that can access the user which gives the userRealmUri */
	createAllUserClient() {
		const httpUri = new URL(`${environment.apiUrl}/graphql/${ALL_USER_CLIENT}`);
		const wsUri = new URL(`${environment.apiUrl}/graphql/${ALL_USER_CLIENT}`);
		wsUri.protocol = 'wss';
		this.createDefaultClient(httpUri.toString(), wsUri.toString(), ALL_USER_CLIENT);
	}

	private createGlobalClient() {
		const httpUri = new URL(`${environment.apiUrl}/graphql/${GLOBAL_CLIENT}`);
		const wsUri = new URL(`${environment.apiUrl}/graphql/${GLOBAL_CLIENT}`);
		wsUri.protocol = 'wss';
		this.createDefaultClient(httpUri.toString(), wsUri.toString(), GLOBAL_CLIENT);

	}

	private createUserClient(httpUri: string, wsUri: string) {
		this.createDefaultClient(httpUri, wsUri, USER_CLIENT);
	}


	private createTeamClient(httpUri: string, wsUri: string) {
		this.createDefaultClient(httpUri, wsUri);
	}

	private createDefaultClient(httpUri: string, wsUri: string, name?: string) {
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
	}

	private clearCache() {
		// resetting intermediate clients
		this.clearClient(this.apollo.use(USER_CLIENT));
		// resetting default client
		this.clearClient(this.apollo);

	}

	private clearClient(base: ApolloBase<any> | any) {
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
