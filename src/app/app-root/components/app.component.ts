import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { ActivityService } from '~shared/activity/services/activity.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UserService, TeamService, CompanyService } from '~global-services';
import { filter } from 'rxjs/operators';
import { TeamClientInitializer, UserClientInitializer, GlobalClientsInitializer } from '~shared/apollo/services';
import { Subscription } from 'rxjs';

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
		private companySrv: CompanyService
	) { }

	ngOnInit(): void {
		this.authSrv.init();
		this.globalClients.init();
		this.userClient.init();
		this.teamSrv.init();
		this.teamClient.init();
		this.companySrv.init();

		this.routerSubscription = this.router.events
						.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(event => {
                document.body.scrollTop = 0;
            });
	}
	ngOnDestroy() {
		this.routerSubscription.unsubscribe();
	}
}
