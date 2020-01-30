import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { User as RealmUser } from 'realm-graphql-client';
import { from, Observable } from 'rxjs';
import { catchError, take, takeUntil, tap } from 'rxjs/operators';
import { AbstractApolloClient } from '~core/apollo/services/abstract-apollo-client.class';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ERMService, RealmServerService, Team, TeamService } from '~core/ERM';
import { LocalStorageService } from '~core/local-storage';
import { ApolloStateService } from './apollo-state.service';





@Injectable({ providedIn: 'root' })
export class TeamClientInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected link: HttpLink,
		protected apolloState: ApolloStateService,
		protected teamSrv: TeamService,
		protected realmServerSrv: RealmServerService,
		protected ermSrv: ERMService,
		protected localStorage: LocalStorageService

	) {
		super(apollo, link, apolloState, realmServerSrv, Client.TEAM, ermSrv, localStorage);
	}

	init(realmUser: RealmUser, team: Team): Observable<any> {
		// here the user client is ready if a team is selected
		this.path = `https://cthuujd7dzdfno6mhynakzlkui.appsync-api.us-east-1.amazonaws.com/graphql`;
		this.setPending('setting pending because creating');
		return from(super.createClient(this.path, realmUser, this.client)).pipe(
			takeUntil(this.destroyed$),
			tap(_ => this.apolloState.setClientReady(this.client)),
			take(1),
			catchError(e => this.onError(e))
		);
	}
}
