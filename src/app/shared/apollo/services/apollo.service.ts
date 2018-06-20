import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, ApolloBase } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { from, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { environment } from 'environments/environment';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { AccessTokenState } from '~features/auth';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { ClientQueries } from '~shared/apollo/services/apollo-client-queries';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';
import { cleanTypenameLink } from '~shared/apollo/services/clean.typename.link';
import { TeamService } from '~shared/global-services/team/team.service';
import { Log } from '~utils';
import { ALL_USER_CLIENT_NAME, GLOBAL_CLIENT, ALL_USER_ENDPOINT, USER_CLIENT_NAME } from '~shared/apollo/services/apollo-endpoints.const';


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
	private accessTokenState: AccessTokenState;

	constructor(
		private apollo: Apollo,
		private apolloState: ApolloStateService,
		private teamSrv: TeamService,
		private httpLink: HttpLink,
		private authSrv: AuthenticationService,
		private router: Router
	) { }

	init() {
		if (ApolloService.initialized) {
			throw Error('Apollo has already been initialized, check that there is only one instance running');
		}
		this.initGlobalClients();

		// when unauthenticated we clear the cache
		this.authSrv.authState$.pipe(
			filter(authState => (!authState.pending && authState.authenticated === false)),
			// we do the two operator below so we do it only once per logout
			map(authState => authState.authenticated),
			distinctUntilChanged(),
		).subscribe(_ => this.clearCache());

		// when the user is connected (we can have an user id but not connected)
		// then we initialize the team client but we wait for the user client to be ready
		this.authSrv.authState$.pipe(
			filter(authState => (!authState.pending && authState.authenticated === true)),
			tap(authState => this.accessTokenState = authState.tokenState),
			// we do the two operator below so we do it only once per login
			map(authState => authState.authenticated),
			distinctUntilChanged(),
		).subscribe(_ => this.initUserClient());

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
		} catch (e) {
			Log.error(e);
			this.apolloState.setUserClientNotReady();
			this.router.navigate(['server-issue']);
		}
	}

	/** create the user client  */
	private async initUserClient() {
		const token = this.accessTokenState.token;
		const id = this.accessTokenState.token_data.identity;
		try {
			// 1. getting the user's realm uri. We need to query 2 clients for that. lol wtf ?!
			const user = await this.getUser(id);
			const realm = await this.getRealm(user.realmServerName);
			// 2. creating user client
			const userUris = this.getUris(realm.httpsPort, realm.hostname, user.realmPath);
			Log.debug('Apollo service', 'creating user client');
			this.createUserClient(userUris.httpUri, userUris.wsUri, token);
			this.apolloState.setUserClientReady();
		} catch (e) {
			Log.error(e);
			this.apolloState.setUserClientNotReady();
			this.router.navigate(['server-issue']);
		}
	}

	private async initTeamClient(team) {
		try {
			// we first clear the last team picked cache
			this.clearClient(this.apollo);
			const realm = await this.getRealm(team.realmServerName);
			const uris = this.getUris(realm.httpsPort, realm.hostname, team.realmPath);
			this.createTeamClient(uris.httpUri, uris.wsUri, this.accessTokenState.token);
			this.apolloState.setTeamClientReady();
		} catch (e) {
			Log.error(e);
			this.router.navigate(['server-issue']);
			this.apolloState.setTeamClientReady();
		}
	}

	/** transform realm uri into http and ws uri
	 * ex: realm://blabla/user/489 into http://blabla/graphql/%2Fuser%2F489
	*/
	private getUris(port: number | string, hostName: string, path: string): { httpUri: string, wsUri: string } {
		const httpUri = `https://${hostName}:${port}/graphQL/${encodeURIComponent(path)}`;
		// uri for websocket
		const wsUri = `wss://${hostName}:${port}/graphQL/${encodeURIComponent(path)}`;
		return { httpUri: httpUri.toString(), wsUri: wsUri.toString() };
	}

	/** gets user from all-users realm */
	private async getUser(id: string) {
		return this.apollo.use(ALL_USER_CLIENT_NAME).query({
			query: ClientQueries.selectUser,
			variables: { id }
		}).pipe(
			map((r: any) => r.data.user)
		).toPromise();
	}

	private async getRealm(realmName: string): Promise<{ hostname: string, httpsPort: string }> {
		return this.apollo.use(GLOBAL_CLIENT).query({
			query: ClientQueries.selectRealmHostName,
			variables: { query: `name == "${realmName}"` }
		}).pipe(
			map((r: any) => r.data.realmServers[0])
		).toPromise();
	}

	/** creates the client that can access the user which gives the userRealmUri */
	createAllUserClient() {
		this.apollo.create({
			link: this.httpLink.create({
				uri: `${environment.apiUrl}/graphql/${ALL_USER_ENDPOINT}`,
			}),
			cache: new InMemoryCache({ addTypename: false })
		}, ALL_USER_CLIENT_NAME);
	}

	private createGlobalClient() {
		this.apollo.create({
			link: this.httpLink.create({
				uri: `${environment.apiUrl}/graphql/${GLOBAL_CLIENT}`,
			}),
			cache: new InMemoryCache({ addTypename: false })
		}, GLOBAL_CLIENT);
	}

	private createUserClient(httpUri: string, wsUri: string, token: string) {
		this.createDefaultClient(httpUri, wsUri, token, USER_CLIENT_NAME);
	}


	private createTeamClient(httpUri: string, wsUri: string, token: string) {
		this.createDefaultClient(httpUri, wsUri, token);
	}

	private createDefaultClient(httpUri: string, wsUri: string, token: string, name?: string) {
		// Create an http link:
		const headers = new HttpHeaders({ Authorization: token });
		const http = this.httpLink.create({
			uri: httpUri,
			headers
		});

		// Create a WebSocket link:
		const ws = new WebSocketLink({
			uri: wsUri,
			options: {
				reconnect: true,
				connectionParams: { token }
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
		this.clearClient(this.apollo.use(ALL_USER_CLIENT_NAME));
		this.clearClient(this.apollo.use(USER_CLIENT_NAME));
		// resetting default client
		this.clearClient(this.apollo);

	}

	private clearClient(base: ApolloBase<any>) {
		if (!base)
			return;
		const client = base.getClient();
		if (client)
			client.resetStore();
	}

}
