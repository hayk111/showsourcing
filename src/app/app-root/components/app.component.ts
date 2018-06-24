import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { ApolloService } from '~shared/apollo/services/apollo.service';
import { log } from '~utils';
import { TeamService, UserService } from '../../global-services';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(
		private authSrv: AuthenticationService,
		private apolloSrv: ApolloService,
		private userSrv: UserService
	) { }

	ngOnInit(): void {
		this.authSrv.init();
		this.apolloSrv.init();
		this.userSrv.init();
	}
}
