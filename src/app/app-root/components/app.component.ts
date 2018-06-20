import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { ApolloService } from '~shared/apollo/services/apollo.service';
import { Log } from '~utils';
import { TeamService, UserService } from '~shared/global-services';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(
		private authSrv: AuthenticationService,
		private apolloSrv: ApolloService,
		private userSrv: UserService,
		private teamSrv: TeamService
	) { }

	ngOnInit(): void {
		Log.info('%c App init ', 'color: yellow; background: grey');
		this.authSrv.init();
		this.apolloSrv.init();
	}
}
