import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { AutoUnsub } from '~utils';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { User } from '~models/user.model';

@Component({
	selector: 'header-app',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends AutoUnsub implements OnInit {
	user$: Observable<User>;

	constructor(private authSrv: AuthenticationService) {
		super();
	}

	ngOnInit() {
	}

	logout() {
		this.authSrv.logout();
	}
}
