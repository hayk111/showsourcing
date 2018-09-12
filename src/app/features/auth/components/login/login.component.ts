import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { take, takeUntil, catchError } from 'rxjs/operators';
import { AutoUnsub } from '~utils';
import { environment } from 'environments/environment';

@Component({
	selector: 'login-app',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss', '../form-style.scss'],
})
export class LoginComponent extends AutoUnsub implements OnInit {
	form: FormGroup;
	pending$ = new Subject<boolean>();
	error: string;
	private returnUrl: string;

	constructor(
		private srv: AuthenticationService,
		private fb: FormBuilder,
		private router: Router,
		private route: ActivatedRoute) {

		super();
		this.form = this.fb.group({
			identifier: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.required]
		});
	}

	ngOnInit() {
		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
	}

	onSubmit() {
		if (this.form.valid) {
			this.pending$.next(true);
			this.srv.login(this.form.value).pipe(
				takeUntil(this._destroy$),
				take(1)
			).subscribe(
				r => {
					this.router.navigateByUrl(this.returnUrl);
				},
				e => {
					if (e.error && e.error.status === 401) {
						this.error = 'Incorrect credentials';
					} else {
						this.error = 'Submition failed, please try again in a short while';
					}
					this.pending$.next(false);
				});
		}
	}

	forgotPw() {
		this.router.navigate(['../forgot-password'], { relativeTo: this.route });
	}
}
