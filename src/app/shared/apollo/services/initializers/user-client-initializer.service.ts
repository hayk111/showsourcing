import { AbstractInitializer } from '~shared/apollo/services/initializers/abstract-initializer.class';
import { USER_CLIENT, ALL_USER_CLIENT } from '~shared/apollo';
import { User } from '~models/user.model';
import { log } from '~utils/log';
import { Apollo } from 'apollo-angular';
import { TokenService } from '~features/auth';
import { HttpLink } from 'apollo-angular-link-http';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { distinctUntilChanged, tap, first, filter } from 'rxjs/operators';
import { GqlClient } from '~shared/apollo/services/gql-client.service';
import { ClientInitializerQueries } from '~shared/apollo/services/initializers/initializer-queries';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserClientInitializer extends AbstractInitializer {

	constructor(
		protected apollo: Apollo,
		protected tokenSrv: TokenService,
		protected link: HttpLink,
		protected apolloState: ApolloStateService,
		protected authSrv: AuthenticationService,
		private gqlClient: GqlClient
	) {
		super(apollo, tokenSrv, link, authSrv, true);
	}

	init() {
		// when authenticated we start user client
		this.authSrv.authState$.pipe(
			filter(authState => authState.authenticated),
			distinctUntilChanged((x, y) => x.authenticated === y.authenticated),
		).subscribe(authState => this.initUserClient(authState.userId));
	}

	/** create the user client  */
	private async initUserClient(id: string) {
		try {
			super.clearClient(USER_CLIENT);
			const user = await this.getUser(id);
			const realm = await super.getRealm(user.realmServerName);
			const userUris = super.getUris(realm.httpsPort, realm.hostname, user.realmPath);
			super.createClient(userUris.httpUri, userUris.wsUri, USER_CLIENT);
			this.apolloState.setUserClientReady();
		} catch (e) {
			log.error(e);
			this.apolloState.setUserClientNotReady();
		}
	}

	/** gets user from all-users realm */
	private async getUser(id: string): Promise<User> {
		// we use a query here because we need to get the user once from all_user client
		return this.gqlClient.use(ALL_USER_CLIENT).selectOne({
			gql: ClientInitializerQueries.selectUser,
			id
		}).pipe(
			first()
		).toPromise();
	}

}
