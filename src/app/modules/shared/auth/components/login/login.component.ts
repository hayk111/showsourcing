import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Credentials } from '../../utils/credentials.interface';
import { Authentication } from '../../../../store/model/authentication.model';
import { selectAuthentication } from '../../../../store/selectors/authentication.selector';

@Component({
	selector: 'login-app',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
	creds: Credentials = { identifier: '', password: '' };
	pending$: Observable<boolean>;
	error$: Observable<string>;
	@Output() forgotPassword = new EventEmitter<any>();

	constructor(private authSrv: AuthService, private store: Store<any>) { }

	ngOnInit() {
		const auth$ = this.store.select(selectAuthentication);
		this.pending$ = auth$.map((auth: Authentication) => auth.pending);
		this.error$ = auth$.map((auth: Authentication) => auth.errorMsg);
	}

	onSubmit() {
		this.authSrv.login(this.creds);
	}

	forgotPw() {
		this.forgotPassword.emit(null);
	}
}
