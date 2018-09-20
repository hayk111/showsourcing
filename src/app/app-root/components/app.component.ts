import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { ActivityService } from '~shared/activity/services/activity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, TeamService, CompanyService } from '~global-services';
import { TeamClientInitializer, UserClientInitializer, GlobalClientsInitializer } from '~shared/apollo/services';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
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
	}
}
