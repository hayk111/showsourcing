import { Component, OnInit, Input, EventEmitter, Output, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidator } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { AutoUnsub } from '~utils';
import { takeUntil, take, catchError, map, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '~entity-services';

@Component({
	selector: 'registration-app',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss', '../form-style.scss']
})
export class RegistrationComponent extends AutoUnsub implements OnInit {
	form: FormGroup;
	pending$ = new Subject<boolean>();
	error: string;
	queryParams: any;

	constructor(
		private authSrv: AuthenticationService,
		private fb: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private userSrv: UserService
	) {
		super();
	}

	ngOnInit() {
		this.queryParams = this.route.snapshot.queryParams || '/';

		this.form = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: [
				'',
				Validators.compose([Validators.required, Validators.email])
			],
			password: [
				'',
				Validators.compose([Validators.required, Validators.minLength(8)])
			]
		});
	}

	createAccount() {
		if (this.form.valid) {
			this.pending$.next(true);
			this.authSrv.register(this.form.value).pipe(
				takeUntil(this._destroy$),
				take(1),
			).subscribe(
				r => this.router.navigateByUrl(this.queryParams.returnUrl),
				e => this.onError(e)
			);
		}
	}

	onError(error) {
		if (error.error && error.error.errors && error.error.errors.email) {
			this.form.get('email').markAsPristine();
			this.error = 'An account already exist with this email address.';
		} else {
			this.error = error.error.message;
		}
	}
}

