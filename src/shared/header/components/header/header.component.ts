import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AutoUnsub } from '~utils/index';
import { Observable } from 'rxjs/Observable';
import { selectAuthentication } from '~auth';
import { AuthActions } from '~auth';
import { map } from 'rxjs/operators';

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
		this.authenticated$ = this.store.select(selectAuthentication).pipe(map(auth => auth.authenticated));
	}

	logout() {
		this.store.dispatch(AuthActions.logout());
	}
}
