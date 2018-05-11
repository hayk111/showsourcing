import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthActions, selectAuthStatus } from '~auth';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'header-app',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends AutoUnsub implements OnInit {
	authenticated$: Observable<boolean>;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.authenticated$ = this.store.select(selectAuthStatus).pipe(map(auth => auth.authenticated));
	}

	logout() {
		this.store.dispatch(AuthActions.logout());
	}
}
