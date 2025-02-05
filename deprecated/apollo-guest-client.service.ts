import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { TokenService } from '~core/auth/services/token.service';
import { ApolloStateService } from './apollo-state.service';
import { log } from '~utils/log';
import { ActivatedRoute } from '@angular/router';
import { AbstractApolloClient } from '~core/apollo/services/abstract-apollo-client.class';
import { RealmServerService } from '~entity-services/realm-server/realm-server.service';
import { Client } from '~core/apollo/services/apollo-client-names.const';


@Injectable({ providedIn: 'root' })
export class GuestClientInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected link: HttpLink,
		protected tokenSrv: TokenService,
		protected apolloState: ApolloStateService,
		protected realmServerSrv: RealmServerService

	) {
		super(apollo, link, apolloState, realmServerSrv, Client.GUEST);
	}

	init() {
		// // when a guest access token is seen we create a guest client
		// this.tokenSrv.guestRefreshToken$.pipe(
		// 	map((guestToken: any) => ({
		// 		uri: this.getUri(guestToken.realm.httpsPort, guestToken.realm.host, guestToken.realm.path),
		// 		token: guestToken.token,
		// 	}))
		// ).subscribe(opts => this.initClient(opts.uri, opts.token, GUEST_CLIENT));

		// // when the refreshToken is gone we close it
		// this.tokenSrv.guestRefreshToken$.pipe(
		// 	distinctUntilChanged(),
		// 	filter(tokenState => !tokenState),
		// ).subscribe(_ => this.destroyClient(GUEST_CLIENT));
	}

}
