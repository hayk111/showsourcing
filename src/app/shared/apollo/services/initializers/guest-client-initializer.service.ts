import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { TokenService } from '~features/auth/services/token.service';
import { ApolloStateService } from './apollo-state.service';
import { AbstractApolloInitializer } from '~shared/apollo/services/initializers/abstract-apollo-initializer.class';
import { log } from '~utils/log';


@Injectable({ providedIn: 'root' })
export class GuestClientInitializer extends AbstractApolloInitializer {

	constructor(
		protected apollo: Apollo,
		protected link: HttpLink,
		protected tokenSrv: TokenService,
		protected apolloState: ApolloStateService,
	) {
		super(apollo, link);
	}

	init() {

		// when a guest access token is seen we create a guest client
		this.tokenSrv.guestAccessToken$.pipe(
			map(guestToken => ({
				uri: this.getUri(guestToken.realm.httpsPort, guestToken.realm.host, guestToken.realm.path),
				token: guestToken.token,
				valid: !guestToken.invalidated
			}))
		).subscribe(opts => {
			if (!opts.valid)
				this.initGuestClient(opts.uri, opts.token)
			else
				this.resetClient();
		});
	}


	/** initialize apollo guest client */
	private async initGuestClient(uri: string, token) {
		try {
			this.createClient(uri, undefined, token);
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
