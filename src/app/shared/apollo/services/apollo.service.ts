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
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { AccessTokenState } from '~features/auth';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { Team } from '~models/team.model';
import { ClientQueries } from '~shared/apollo/services/apollo-client-queries';
import { cleanTypenameLink } from '~shared/apollo/services/clean.typename.link';
import { LocalStorageService } from '~shared/local-storage';
import { Log } from '~utils';

const ALL_USER_ENDPOINT = 'all-users';
const ALL_USER_CLIENT_NAME = 'all-users';
export const USER_CLIENT_NAME = 'user';

const SELECTED_TEAM_ID = 'selected-team-id';


@Injectable({
	providedIn: 'root'
})
export class ApolloService {
	private static initialized = false;

	private _teamClientReady$ = new BehaviorSubject<boolean>(null);
	teamClientReady$: Observable<boolean> = this._teamClientReady$.asObservable();

	private _userClientReady$ = new BehaviorSubject<boolean>(null);
	userClientReady$: Observable<boolean> = this._userClientReady$.asObservable();

	private accessTokenState: AccessTokenState;
	private userTeams$: Observable<Team[]>;
	private currentTeam$: Observable<Team>;
	private selectedTeamId$ = new BehaviorSubject<string>(null);

	constructor(
		private apollo: Apollo,
		private httpLink: HttpLink,
		private authSrv: AuthenticationService,
		private router: Router,
		private storage: LocalStorageService
	) { }

	init() {
		if (ApolloService.initialized) {
			throw Error('Apollo has already been initialized, check that there is only one instance running');
		}

		this.restoreSelectedTeam();

		// when unauthenticated we clear the cache
		this.authSrv.authState$.pipe(
			filter(authState => (!authState.pending && authState.authenticated === false)),
			// we do the two operator below so we do it only once per logout
			map(authState => authState.authenticated),
			distinctUntilChanged(),
		).subscribe(_ => this.clearCache());

		// 1. when authenticated we initialise the apollo user client
		this.authSrv.authState$.pipe(
			filter(authState => (!authState.pending && authState.authenticated === true)),
			tap(authState => this.accessTokenState = authState.tokenState),
			// we do the two operator below so we do it only once per login
			map(authState => authState.authenticated),
			distinctUntilChanged(),
		).subscribe(_ => this.initUserClient());

		// 2. when the userClient has been initialized we get the current teams
		this.userTeams$ = this._userClientReady$.pipe(
			filter(ready => ready),
			switchMap(_ => this.getTeams()),
		);
		// 3. When we have teams we find out what the selected team is then we initialize the team client
		// team => this.initTeamClient(team),

		this.currentTeam$ = combineLatest(this.selectedTeamId$, this.userTeams$, (id, teams) => this.getSelectedTeam(id, teams));
		this.currentTeam$
			.pipe()
			.subscribe(
				team => this.initTeamClient(team),
				e => this._teamClientReady$.next(false)
			);
	}


	selectTeam(teamId: string) {
		this.storage.setItem(SELECTED_TEAM_ID, teamId);
		window.location.href = window.location.href + '/home';
	}

	private getSelectedTeam(selectedId: string, teams: Team[]) {
		// if the user has selected a team during the current session
		let teamSelected;
		if (selectedId && (teamSelected = teams.filter(team => team.id === selectedId)[0])) {
			return teamSelected;
			// if not we pick the first team of the bunch
		} else if (teams.length > 0) {
			return teams[0];
			// if there are no team we redirect the user to a page that lets him create a team
		} else {
			this.router.navigate(['user', 'pick-a-team']);
			return null;
		}
	}

	private restoreSelectedTeam() {
		const selectedTeamId: string = this.storage.getItem(SELECTED_TEAM_ID);
		this.selectedTeamId$.next(selectedTeamId);
	}

	/** create the user client  */
	private async initUserClient() {
		const token = this.accessTokenState.token;
		const id = this.accessTokenState.token_data.identity;
		try {
			// 1. creating all-users client and getting the user
			this.createAllUserClient(token);
			const user = await this.getUser(id);

			// 2. creating user client
			const userUris = this.getUris(user.userRealmUri);
			Log.debug('Apollo service', 'creating user client');
			this.createUserClient(userUris.httpUri, userUris.wsUri, token);
			this._userClientReady$.next(true);
		} catch (e) {
			Log.error(e);
			this._userClientReady$.next(false);
			this.router.navigate(['server-issue']);
		}
	}

	private initTeamClient(team) {
		const uris = this.getUris(team.realmUri);
		try {
			// we first clear the last team picked cache
			this.clearClient(this.apollo);
			this.createTeamClient(uris.httpUri, uris.wsUri, this.accessTokenState.token);
		} catch (e) {
			Log.error(e);
			this.router.navigate(['server-issue']);
			this._teamClientReady$.next(false);
		}
		this._teamClientReady$.next(true);
	}

	/** transform realm uri into http and ws uri
	 * ex: realm://blabla/user/489 into http://blabla/graphql/%2Fuser%2F489
	*/
	private getUris(realmUri: string): { httpUri: string, wsUri: string } {
		const httpUri = new URL(realmUri);
		httpUri.protocol = 'https';
		httpUri.pathname = '/graphql/' + encodeURIComponent(httpUri.pathname);
		// uri for websocket
		const wsUri = new URL(httpUri.toString());
		wsUri.protocol = 'wss';
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

	/** gets teams from user realm */
	private getTeams(): Observable<any> {
		return this.apollo.use(USER_CLIENT_NAME).subscribe({
			query: ClientQueries.selectTeams,
		}).pipe(
			map((r: any) => r.data.teams)
		);
	}

	/** creates the client that can access the user which gives the userRealmUri */
	private createAllUserClient(token: string) {
		const headers = new HttpHeaders({ Authorization: token });
		this.apollo.create({
			link: this.httpLink.create({
				uri: `${environment.apiUrl}/graphql/${ALL_USER_ENDPOINT}`,
				headers
			}),
			cache: new InMemoryCache({ addTypename: false })
		}, ALL_USER_CLIENT_NAME);
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
