import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'confirm-email-page-app',
	templateUrl: './confirm-email-page.component.html',
	styleUrls: ['./confirm-email-page.component.scss', '../../shared/form-style.scss']
})
export class ConfirmEmailPageComponent extends AutoUnsub implements OnInit {
	codeCtrl = new FormControl('', Validators.required);
	pending$ = new BehaviorSubject(false);
	email: string;

	constructor(
		private authSrv: AuthenticationService,
	) {
		super();
	}

	ngOnInit() {
		this.email = this.authSrv.getEmail();
		this.codeCtrl.valueChanges.pipe(
			takeUntil(this._destroy$),
			filter(x => !!x)
		).subscribe(value => this.checkCode(value));
	}

	checkCode(value: string) {
		if (value.length === 6) {
			this.pending$.next(true);
			this.authSrv.confirmSignUp(value)
				.finally(() => this.pending$.next(false));
		}
	}

	resend() {
		this.authSrv.resendSignUp();
	}
}

