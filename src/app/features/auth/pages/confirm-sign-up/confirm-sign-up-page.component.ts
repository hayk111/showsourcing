import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { AutoUnsub } from '~utils';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'confirm-sign-up-page-app',
	templateUrl: './confirm-sign-up-page.component.html',
	styleUrls: ['./confirm-sign-up-page.component.scss', '../../shared/form-style.scss']
})
export class ConfirmSignUpPageComponent extends AutoUnsub implements OnInit {
	codeCtrl = new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]);
	pending$ = new BehaviorSubject(false);
	username: string;
	error: string;

	constructor(
		private authSrv: AuthenticationService,
		private route: ActivatedRoute,
	) {
		super();
	}

	ngOnInit() {
		this.username = this.route.snapshot.queryParamMap.get('username');
		this.codeCtrl.valueChanges.pipe(
			takeUntil(this._destroy$),
			filter(x => x.length === 6),
		).subscribe(value => this.checkCode(value));
	}

	checkCode(value: string = '') {
		if (this.codeCtrl.valid) {
			this.pending$.next(true);
			this.authSrv.confirmSignUp(this.username, value)
			.catch(e => {
				this.error = e.code;
				this.pending$.next(false);
			});
		}
	}

	resend() {
		this.authSrv.resendSignUp(this.username);
	}
}

