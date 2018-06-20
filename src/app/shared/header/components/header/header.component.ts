import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { UserService } from '~shared/global-services';
import { User } from '~models/user.model';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'header-app',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends AutoUnsub implements OnInit {
	user$: Observable<User>;

	constructor(
		private authSrv: AuthenticationService,
		private userSrv: UserService
	) {
		super();
	}

	ngOnInit() {
		this.user$ = this.userSrv.selectUser();
	}

	logout() {
		this.authSrv.logout();
	}
}
