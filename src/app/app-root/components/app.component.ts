import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, zip, combineLatest, forkJoin } from 'rxjs';
import { filter, shareReplay, tap, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { CompanyService, TeamService } from '~global-services';
import { TeamClientInitializer, UserClientInitializer } from '~core/apollo/services';
import { TokenService, AuthStatus } from '~core/auth';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { GlobalDataClientsInitializer } from '~core/apollo/services/apollo-global-data-client.service';
import { GlobalConstClientInitializer } from '~core/apollo/services/apollo-global-const-client.service';
import { Team } from '~models';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

	constructor(
		private authSrv: AuthenticationService,
		private globalDataClient: GlobalDataClientsInitializer,
		private globalConstClient: GlobalConstClientInitializer,
		private userClient: UserClientInitializer,
		private teamClient: TeamClientInitializer,
		private teamSrv: TeamService,
		private companySrv: CompanyService,
		private tokenSrv: TokenService
	) { }

	ngOnInit(): void {
		this.authSrv.init();
		this.teamSrv.init();
		this.companySrv.init();

		// when authenticated we start the required clients
		this.authSrv.authenticated$.pipe(
			switchMap(_ => this.startBaseClients())
		).subscribe();

		// when logging off we destroy all clients
		this.authSrv.notAuthenticated$
			.subscribe(_ => this.destroyAllClients());

		// when a team is selected we start the team client
		this.teamSrv.teamSelected$.pipe(
			switchMap(team => this.startTeamClient(team) as any)
		).subscribe();
	}

	private startBaseClients(): Observable<Client[]> {
		// when we are authenticated it means we have a token
		const token = this.tokenSrv.authRefreshTokenSync;
		return forkJoin([
			this.globalConstClient.init(token),
			this.globalDataClient.init(token),
			this.userClient.init(token)
		]);
	}

	private startTeamClient(team: Team) {
		const token = this.tokenSrv.authRefreshTokenSync;
		// destroy team client first in case there was a previous team selectioned
		this.teamClient.setPending('switching / no team selected');
		if (team) {
			return this.teamClient.init(token, team);
		}
	}

	private destroyAllClients() {
		const reason = 'unauthenticated';
		this.globalConstClient.destroy(reason);
		this.globalDataClient.destroy(reason);
		this.userClient.destroy(reason);
		this.teamClient.destroy(reason);
	}
}
