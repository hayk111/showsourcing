import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { GlobalClientsInitializer } from '~shared/apollo/services/initializers/global-clients-initializer.service';
import { UserClientInitializer } from '~shared/apollo/services/initializers/user-client-initializer.service';
import { TeamClientInitializer } from '~shared/apollo/services/initializers/team-client-initializer.service';
import { ActivityService } from '~shared/activity/services/activity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, TeamService } from '~global-services';


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
	) { }

	ngOnInit(): void {
		this.authSrv.init();
		this.globalClients.init();
		this.userClient.init();
		// team srv needs to be initialized after the user client
		this.teamSrv.init();
		this.teamClient.init();
	}
}
