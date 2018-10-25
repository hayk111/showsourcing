import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, zip, combineLatest } from 'rxjs';
import { filter, shareReplay, tap } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { CompanyService, TeamService } from '~global-services';
import { TeamClientInitializer, UserClientInitializer } from '~shared/apollo/services';
import { TokenService, AuthStatus } from '~features/auth';
import { Client } from '~shared/apollo/services/apollo-client-names.const';
import { GlobalDataClientsInitializer } from '~shared/apollo/services/apollo-global-data-client.service';
import { GlobalConstClientInitializer } from '~shared/apollo/services/apollo-global-const-client.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

	routerSubscription: Subscription;

	constructor(
		private router: Router,
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

		this.authSrv.authStatus$.subscribe(status => {
			if (status === AuthStatus.AUTHENTICATED)
		})
		this.startRealmClientsHandlers();

		this.routerSubscription = this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => document.body.scrollTop = 0);
	}

	private onAuthStatusChange(status: AuthStatus) {
		switch (status) {
			case AuthStatus.AUTHENTICATED:
				return this.startRealmClientsHandlers()
		}
	}

	private startRealmClients() { }

	private destroyRealmClients() { }

	private startRealmClientsHandlers() {
		const refresh$ = this.tokenSrv.refreshToken$.pipe(shareReplay(1));

		// when a refresh token is found we can start basic clients
		refresh$.subscribe(token => {
			if (token) {
				this.globalConstClient.init(token);
				this.globalDataClient.init(token);
				this.userClient.init(token);
			} else {
				this.globalConstClient.destroy();
				this.globalDataClient.destroy();
				this.userClient.destroy();
			}
		});

		const teamSelected$ = this.teamSrv.teamSelectionEvent$.pipe(
			filter(team => !!team),
			tap(_ => this.teamClient.destroy('changing team', true)),
			shareReplay(1)
		);
		// when no team selected we also destroy the team client
		this.teamSrv.hasTeamSelected$.pipe(
			filter(has => !has),
		).subscribe(_ => this.teamClient.destroy('no team selected'));

		// init team client when team selected and refresh found
		combineLatest(teamSelected$, refresh$)
			.subscribe(([team, token]) => this.teamClient.init(token, team));
	}


	ngOnDestroy() {
		this.routerSubscription.unsubscribe();
	}
}
