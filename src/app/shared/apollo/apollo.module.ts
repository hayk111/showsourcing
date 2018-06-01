import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { split, from } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { cleanTypenameLink } from './clean.typename.link';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClientQueries } from '~shared/apollo/apollo-client-queries';
import { map, filter, switchMap, tap } from 'rxjs/operators';
import { TokenService } from '~features/auth/services/token.service';
import { AccessTokenResponse } from '~features/auth/interfaces/access-token-response.interface';
import { ApolloIssuePageComponent } from './components/apollo-issue-page/apollo-issue-page.component';
import { Router } from '@angular/router';
import { Log } from '~utils';


const ALL_USER_ENDPOINT = 'all-users';
const ALL_USER_CLIENT_NAME = 'all-users';
export const USER_CLIENT_NAME = 'user';

@NgModule({
	imports: [
		HttpClientModule, // provides HttpClient for HttpLink
		ApolloModule,
		HttpLinkModule
	],
	exports: [
		HttpClientModule, // provides HttpClient for HttpLink
		ApolloModule,
		HttpLinkModule,
		ApolloIssuePageComponent
	],
	declarations: [ApolloIssuePageComponent]
})
export class AppApolloModule {
	private static _teamClientReady$ = new BehaviorSubject<boolean>(null);
	static teamClientReady$: Observable<boolean> = AppApolloModule._teamClientReady$.asObservable();

	private static _userClientReady$ = new BehaviorSubject<boolean>(null);
	static userClientReady$: Observable<boolean> = AppApolloModule._userClientReady$.asObservable();

	constructor(private apollo: Apollo,
		private httpLink: HttpLink,
		private tokenSrv: TokenService,
		private router: Router
	) {
		// TODO: here every time the token changes the process is gonna be restarted
		let tokenDataTemp;
		this.tokenSrv.accessToken$
			.pipe(
				tap(tokenData => tokenDataTemp = tokenData)
			)
			.subscribe(tokenData => tokenData ? this.initUserClient(tokenData) : this.clearCache());

		AppApolloModule._userClientReady$.pipe(
			filter(ready => ready),
			switchMap(_ => this.getTeams()),
			// create client for first team
		).subscribe(teams => {
			debugger;
			if (teams[0]) {
				const uris = this.getUris(teams[0].realmUri);
				this.createTeamClient(uris.httpUri, uris.wsUri, tokenDataTemp);
				console.log('team client created');
				AppApolloModule._teamClientReady$.next(true);
			} else {
				AppApolloModule._teamClientReady$.next(false);
			}
		});
	}

	// TODO: error handling

	/** create the user client  */
	private async initUserClient(tokenData: AccessTokenResponse) {
		const token = tokenData.user_token.token;
		const id = tokenData.user_token.token_data.identity;
		try {
			// 1. creating all-users client and getting the user
			this.createAllUserClient(token);
			const user = await this.getUser(id);

			// 2. creating user client and getting teams
			const userUris = this.getUris(user.userRealmUri);
			this.createUserClient(userUris.httpUri, userUris.wsUri, token);
			AppApolloModule._userClientReady$.next(true);
			console.log('user client created');
		} catch (e) {
			Log.error(e);
			// this.router.navigate(['server-issue']);
			// AppApolloModule._userClientReady$.next(false);
		}
	}

	/** transform realm uri into http and ws uri */
	private getUris(realmUri: string): { httpUri: string, wsUri: string } {
		const httpUri = new URL(realmUri);
		httpUri.protocol = 'http';
		httpUri.pathname = '/graphql/' + encodeURIComponent(httpUri.pathname);
		// uri for websocket
		const wsUri = new URL(httpUri.toString());
		wsUri.protocol = 'ws';
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

	private getTeams(): Observable<any> {
		return this.apollo.use(USER_CLIENT_NAME).subscribe({
			query: ClientQueries.selectTeams,
		}).pipe(
			map((r: any) => r.data.teams)
		);
	}

	/** creates the client that can access the user which gives the userRealmUri */
	private createAllUserClient(token: string) {
		debugger;
		const headers = new HttpHeaders({ Authorization: token });
		this.apollo.create({
			link: this.httpLink.create({
				uri: `api/graphql/${ALL_USER_ENDPOINT}`,
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
			// TODO: addTypename should be done with the clean typename link
			cache: new InMemoryCache({ addTypename: false })
		}, name);
	}

	// TODO: clear cache of the right client
	private clearCache() {
		const client = this.apollo.getClient();
		if (client)
			client.resetStore();
	}
}
