import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AutoUnsub } from '~utils';
import { AuthenticationService } from '~app/features/auth/services/authentication.service';

@Component({
	selector: 'header-app',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends AutoUnsub implements OnInit {
	authenticated$: Observable<boolean>;

	constructor(private authSrv: AuthenticationService) {
		super();
	}

	ngOnInit() {
		this.authenticated$ = this.authSrv.authenticated$;
	}

	logout() {
		this.authSrv.logout();
	}
}
