import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { AutoUnsub } from '~utils';
import { AuthenticationService } from '~features/auth/services/authentication.service';

@Component({
	selector: 'header-app',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends AutoUnsub implements OnInit {
	authenticated$: Observable<boolean>;

	constructor(private authSrv: AuthenticationService) {
		super();
		console.log('header');
	}

	ngOnInit() {
		this.authenticated$ = this.authSrv.authState$.pipe(
			takeUntil(this._destroy$),
			map(authState => authState.authenticated),
		);
	}

	logout() {
		this.authSrv.logout();
	}
}
