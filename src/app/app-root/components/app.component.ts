import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { CompanyService, TeamService } from '~global-services';
import { GlobalClientsInitializer, TeamClientInitializer, UserClientInitializer } from '~shared/apollo/services';
import { TokenService } from '~features/auth';

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
		private globalClients: GlobalClientsInitializer,
		private userClient: UserClientInitializer,
		private teamClient: TeamClientInitializer,
		private teamSrv: TeamService,
		private companySrv: CompanyService,
		private tokenSrv: TokenService
	) { }

	ngOnInit(): void {
		this.authSrv.init();
		this.tokenSrv.restoreRefreshToken();
		this.globalClients.init();
		this.userClient.init();
		this.teamSrv.init();
		this.teamClient.init();
		this.companySrv.init();

		this.routerSubscription = this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => document.body.scrollTop = 0);
	}

	ngOnDestroy() {
		this.routerSubscription.unsubscribe();
	}
}
