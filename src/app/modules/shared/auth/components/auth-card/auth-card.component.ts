import { Component, OnInit } from '@angular/core';
import { AuthCardService } from '../../services/auth-card.service';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../../store/action/authentication.action';
import { AuthView, AuthDlgActions } from '../../../../store/action/auth-dlg.action';
import { selectAuthDlg } from '../../../../store/selectors/auth-dlg.selector';

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

	onLogin(creds: any) {
		this.store.dispatch(AuthActions.login(creds));
	}

	onRegister(creds: any) {
		this.store.dispatch(AuthActions.register(creds));
	}

	goTo(authView: AuthView) {
		this.store.dispatch(AuthDlgActions.setView(authView));
	}

	onPwReset(email: string) {
		this.store.dispatch(AuthActions.resetPassword(email));
	}

}
