import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GlobalDataClientsInitializer, UserClientInitializer } from '~core/apollo';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { GlobalRequestClientsInitializer } from '~core/apollo/services/apollo-global-request-client.service';
import { AuthenticationService } from '~core/auth/services/authentication.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	constructor(
		private authSrv: AuthenticationService,
		private globalRequestClient: GlobalRequestClientsInitializer,
		private globalDataClient: GlobalDataClientsInitializer,
		private userClient: UserClientInitializer
	) { }

	ngOnInit(): void {
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
		const realmUser = this.authSrv.realmUser;
		return forkJoin([
			this.globalRequestClient.init(realmUser),
			this.globalDataClient.init(realmUser)
		]);
	}


	private destroyAllClients() {
		const reason = 'unauthenticated';
		this.globalRequestClient.destroy(reason);
	}
}


