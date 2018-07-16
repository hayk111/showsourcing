import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { distinctUntilChanged, filter, first, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { TokenService } from '~features/auth/services/token.service';
import { User } from '~models/user.model';
import { ALL_USER_CLIENT, USER_CLIENT } from '~shared/apollo/services/apollo-endpoints.const';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';
import { AbstractApolloInitializer } from '~shared/apollo/services/initializers/abstract-initializer.class';
import { ClientInitializerQueries } from '~shared/apollo/services/initializers/initializer-queries';
import { log } from '~utils/log';
import { from, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserClientInitializer extends AbstractApolloInitializer {

	constructor(
		protected apollo: Apollo,
		protected tokenSrv: TokenService,
		protected link: HttpLink,
		protected apolloState: ApolloStateService,
		protected authSrv: AuthenticationService,
		private wrapper: ApolloWrapper
	) {
		super(apollo, tokenSrv, link, authSrv, true);
	}

	init() {
		// when authenticated we start user client
		return this.authSrv.authState$.pipe(
			distinctUntilChanged((x, y) => x.userId === y.userId)
		).subscribe(authState => {
			if (authState.authenticated)
				this.initUserClient(authState.userId);
			else
				this.resetClient();
		});
	}

	/** create the user client  */
	private async initUserClient(id: string) {
		try {
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
		return this.wrapper.use(ALL_USER_CLIENT).selectOne({
			gql: ClientInitializerQueries.selectUser,
			id
		}).pipe(
			first()
		).toPromise();
	}

	private resetClient() {
		super.clearClient(USER_CLIENT);
		this.apolloState.resetUserClient();
	}
}
