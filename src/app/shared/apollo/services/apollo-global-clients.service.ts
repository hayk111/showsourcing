import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { environment } from 'environments/environment';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { TokenService } from '~features/auth/services/token.service';
import { ApolloStateService } from './apollo-state.service';
import { log, LogColor } from '~utils';
import { filter, first, distinctUntilChanged, switchMap, merge, concat, combineLatest, tap } from 'rxjs/operators';
import { AbstractApolloClient } from '~shared/apollo/services/abstract-apollo-client.class';
import { ALL_USER_CLIENT, GLOBAL_CONSTANT_CLIENT, GLOBAL_DATA_CLIENT } from '~shared/apollo/services/apollo-client-names.const';
import { TokenState } from '~features/auth/interfaces/token-state.interface';
import { mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class GlobalClientsInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected apolloState: ApolloStateService,
		protected tokenSrv: TokenService,
		protected httpLink: HttpLink,
	) {
		super(apollo, httpLink, apolloState);
	}

	init() {
		// observable emitting when a new VALID refresh token has been emitted
		const refreshToken$ = this.tokenSrv.refreshToken$.pipe(
			distinctUntilChanged(),
			filter(token => !!token),
			tap(_ => log.debug('%c refresh token received, starting global clients', LogColor.APOLLO_CLIENT_PRE))
		);

		// observable emitting when the refreshToken has been invalidated
		const noRefreshToken$ = this.tokenSrv.refreshToken$.pipe(
			distinctUntilChanged(),
			filter(token => !token),
		).subscribe(_ => {
			this.destroyClient(ALL_USER_CLIENT);
			this.destroyClient(GLOBAL_CONSTANT_CLIENT);
			this.destroyClient(GLOBAL_DATA_CLIENT);
		});

		// when new refreshToken, get accessToken for each of those clients
		refreshToken$.pipe(
			switchMap(refreshToken => forkJoin([
				this.tokenSrv.getAccessToken(refreshToken, ALL_USER_CLIENT),
				this.tokenSrv.getAccessToken(refreshToken, GLOBAL_CONSTANT_CLIENT),
				this.tokenSrv.getAccessToken(refreshToken, GLOBAL_DATA_CLIENT)
			]))).subscribe((accessTokens: TokenState[]) => {
				this.initClient(`${environment.graphqlUrl}/${ALL_USER_CLIENT}`, accessTokens[0].token, ALL_USER_CLIENT);
				this.initClient(`${environment.graphqlUrl}/${GLOBAL_CONSTANT_CLIENT}`, accessTokens[1].token, GLOBAL_CONSTANT_CLIENT);
				this.initClient(`${environment.graphqlUrl}/${GLOBAL_DATA_CLIENT}`, accessTokens[2].token, GLOBAL_DATA_CLIENT);
			});

	}
}

