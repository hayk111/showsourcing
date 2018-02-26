import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions, AuthDlgActions, selectAuthDlg } from '~auth/store';
import { AuthView, Credentials } from '~auth/models';

@Component({
	selector: 'auth-card-app',
	templateUrl: './auth-card.component.html',
	styleUrls: ['./auth-card.component.scss']
})
export class AuthCardComponent implements OnInit {
	authDlg$;
	views = AuthView;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.authDlg$ = this.store.select(selectAuthDlg);
	}

	onLogin(creds: Credentials) {
		this.store.dispatch(AuthActions.login(creds));
	}

	onRegister(creds: Credentials) {
		this.store.dispatch(AuthActions.register(creds));
	}

	goTo(authView: AuthView) {
		this.store.dispatch(AuthDlgActions.setView(authView));
	}

	onPwReset(email: string) {
		this.store.dispatch(AuthActions.resetPassword(email));
	}

}
