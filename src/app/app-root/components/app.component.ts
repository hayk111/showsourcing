import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { GlobalClientsInitializer } from '~shared/apollo/services/initializers/global-clients-initializer.service';
import { UserClientInitializer } from '~shared/apollo/services/initializers/user-client-initializer.service';
import { TeamClientInitializer } from '~shared/apollo/services/initializers/team-client-initializer.service';
import { TeamPickerService } from '~features/pick-a-team/services/team-picker.service';
import { ActivityService } from '~shared/activity/services/activity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '~global-services';


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
		private teamPicker: TeamPickerService,
		private activitySrv: ActivityService,
	) { }

	ngOnInit(): void {
		this.authSrv.init();
		this.globalClients.init();
		this.userClient.init();
		this.teamPicker.init();
		this.teamClient.init();
		this.activitySrv.init();
	}
}
