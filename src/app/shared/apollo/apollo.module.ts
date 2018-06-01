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
import { map } from 'rxjs/operators';
import { TokenService } from '~features/auth/services/token.service';
import { AccessTokenResponse } from '~features/auth/interfaces/access-token-response.interface';
import { ApolloIssuePageComponent } from './components/apollo-issue-page/apollo-issue-page.component';
import { Router } from '@angular/router';
import { Log } from '~utils';


const ALL_USER_ENDPOINT = 'all-users';
const USER_CLIENT_NAME = 'all-users';

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

	private static _clientReady$ = new BehaviorSubject<boolean>(null);
	static clientReady$: Observable<boolean> = AppApolloModule._clientReady$.asObservable();

	constructor(private apollo: Apollo, private httpLink: HttpLink, private tokenSrv: TokenService, private router: Router) {
		// when authenticated we start the process
		this.tokenSrv.accessToken$
			.subscribe(tokenData => tokenData ? this.init(tokenData) : this.clearCache());
	}

	private async init(tokenData: AccessTokenResponse) {
		let user;
		try {
			this.createUserClient(tokenData.user_token.token);
			user = await this.apollo.use(USER_CLIENT_NAME).query({
				query: ClientQueries.selectUser,
				variables: { id: tokenData.user_token.token_data.identity }
			}).pipe(
				map((r: any) => r.data.user)
			).toPromise();
		} catch (e) {
			Log.error(e);
			this.router.navigate(['server-issue']);
		}

		// since this is a realm uri, we need to transform it into http url
		const { wsUri, httpUri } = this.getUris(user.userRealmUri);
		this.createDefaultClient(httpUri, wsUri);
		AppApolloModule._clientReady$.next(true);
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

	private createUserClient(token: string) {
		const headers = new HttpHeaders({ Authorization: token });
		this.apollo.create({
			link: this.httpLink.create({
				uri: `api/graphql/${ALL_USER_ENDPOINT}`,
				headers
			}),
			cache: new InMemoryCache({ addTypename: false })
		}, USER_CLIENT_NAME);
	}

	private createDefaultClient(httpUri: string, wsUri: string) {
		// Create an http link:
		const http = this.httpLink.create({ uri: httpUri });

		// Create a WebSocket link:
		const ws = new WebSocketLink({
			uri: wsUri,
			options: {
				reconnect: true
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
			cache: new InMemoryCache({ addTypename: false })
		}, name);
	}

	private clearCache() {
		this.apollo.getClient().resetStore();
	}
}
