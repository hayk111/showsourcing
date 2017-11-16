import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Store } from '@ngrx/store';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'header-app',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends AutoUnsub implements OnInit {
	authenticated$: Observable<boolean>;

	constructor(private authSrv: AuthService, private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.authenticated$ = this.store.select('authentication')
			.map(auth => auth.authenticated);
	}

	logout() {
		this.authSrv.logout();
	}
}
