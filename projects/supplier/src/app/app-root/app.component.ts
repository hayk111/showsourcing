import { Component, OnInit } from '@angular/core';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApolloStateService, ClientStatus, GlobalDataClientsInitializer } from '~core/apollo';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { GlobalRequestClientsInitializer } from '~core/apollo/services/apollo-global-request-client.service';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { RealmAuthenticationService } from '~core/auth/services/realm-authentication.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	isSpinnerShown$: Observable<boolean>;

	constructor(
		private authSrv: AuthenticationService,
		private realmAuthSrv: RealmAuthenticationService,
		private globalRequestClient: GlobalRequestClientsInitializer,
		private globalDataClient: GlobalDataClientsInitializer,
		private apolloState: ApolloStateService
	) { }

	ngOnInit(): void {

		const authenticated$ = this.authSrv.authenticated$;
		const clientStatus$ = this.apolloState.getClientStatus(Client.GLOBAL_REQUEST);

		this.isSpinnerShown$ = combineLatest(
			authenticated$,
			clientStatus$,
			(authenticated, status) => authenticated && status === ClientStatus.PENDING
		);

		this.authSrv.init();
		// when authenticated we start the required clients
		this.authSrv.authenticated$.pipe(
			switchMap(_ => this.startBaseClients())
		).subscribe();

		// when logging off we destroy all clients
		this.authSrv.notAuthenticated$
			.subscribe(_ => this.destroyAllClients());
	}

	private startBaseClients(): Observable<Client[]> {
		// when we are authenticated it means we have a token
		const realmUser = this.realmAuthSrv.realmUser;
		return forkJoin([
			this.globalRequestClient.init(realmUser),
			this.globalDataClient.init(realmUser)
		]);
	}


	private destroyAllClients() {
		const reason = 'unauthenticated';
		this.globalRequestClient.destroy(reason);
		this.globalDataClient.destroy(reason);
	}
}


