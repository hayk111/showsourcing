import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { TokenService } from '~features/auth/services/token.service';
import { ApolloStateService } from './apollo-state.service';
import { log } from '~utils/log';
import { ActivatedRoute } from '@angular/router';
import { AbstractApolloClient } from '~shared/apollo/services/abstract-apollo-client.class';
import { GUEST_CLIENT } from '~shared/apollo/services/apollo-client-names.const';


@Injectable({ providedIn: 'root' })
export class GuestClientInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected link: HttpLink,
		protected tokenSrv: TokenService,
		protected apolloState: ApolloStateService,
		private route: ActivatedRoute
	) {
		super(apollo, link);
	}

	init() {
		// when a guest access token is seen we create a guest client
		this.tokenSrv.guestRefreshToken$.pipe(
			map((guestToken: any) => ({
				uri: this.getUri(guestToken.realm.httpsPort, guestToken.realm.host, guestToken.realm.path),
				token: guestToken.token,
			}))
		).subscribe(opts => this.initGuestClient(opts.uri, opts.token));

		// when the refreshToken is gone we close it
		this.tokenSrv.guestRefreshToken$.pipe(
			distinctUntilChanged(),
			filter(tokenState => !tokenState),
		).subscribe(_ => this.resetClient());
	}


	/** initialize apollo guest client */
	private initGuestClient(uri: string, token) {
		try {
			this.createClient(uri, GUEST_CLIENT, token);
			this.apolloState.setGuestClientReady();
		} catch (e) {
			log.error(e);
			this.apolloState.setGuestClientNotReady();
		}
	}

	private resetClient() {
		super.clearClient();
		this.apolloState.resetGuestClient();
	}

}
