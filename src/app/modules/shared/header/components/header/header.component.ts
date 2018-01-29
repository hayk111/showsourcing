import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { Observable } from 'rxjs/Observable';
import { selectAuthentication } from '../../../../store/selectors/misc/authentication.selector';
import { AuthActions } from '../../../../store/action/misc/authentication.action';

@Component({
	selector: 'header-app',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends AutoUnsub implements OnInit {
	authenticated$: Observable<boolean>;

	constructor( private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.authenticated$ = this.store.select(selectAuthentication)
			.map(auth => auth.authenticated);
	}

	logout() {
		this.store.dispatch(AuthActions.logout());
	}
}
