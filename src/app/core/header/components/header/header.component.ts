import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { TeamService, UserService } from '~entity-services';
import { Team } from '~models';
import { User } from '~models/user.model';


@Component({
	selector: 'header-app',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	user$: Observable<User>;
	team$: Observable<Team>;
	isProd = environment.production;

	constructor(
		private authSrv: AuthenticationService,
		private userSrv: UserService,
		private teamSrv: TeamService) { }

	ngOnInit() {
		this.user$ = this.userSrv.selectUser();
		this.team$ = this.teamSrv.teamSelected$;
	}

	logout() {
		this.authSrv.logout();
	}

}
