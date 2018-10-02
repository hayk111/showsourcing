import { Component, OnInit, Input, EventEmitter, Output, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidator } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { AutoUnsub } from '~utils';
import { takeUntil, take, catchError, map, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '~global-services';

@Component({
	selector: 'registration-app',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss', '../form-style.scss']
})
export class RegistrationComponent extends AutoUnsub implements OnInit {
	form: FormGroup;
	pending$ = new Subject<boolean>();
	error: string;

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
		this.form = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: [
				'',
				Validators.compose([Validators.required, Validators.email]),
				[new EmailNotTakenValidators(this.userSrv)]
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
				r => {
					// we check if there is a returnUrl query parameter
					const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
					// we navigate to dashboard or return url for sure on registration end
					this.router.navigateByUrl(returnUrl);
				},
				e => {
					if (e.error && e.error.errors && e.error.errors.email) {
						this.form.get('email').markAsPristine();
						this.error = 'An account already exist with this email address.';
					} else {
						this.error = e.error.message;
					}
					this.pending$.next(false);
				}
			);
		}
	}

	validateEmailNotTaken(control: AbstractControl): Observable<{ [errorName: string]: boolean }> {
		return this.userSrv.queryOneByPredicate(`email == "${control.value}"`, 'email').pipe(
			map(emailTaken => !!emailTaken),
			map(emailTaken => ({ emailTaken }))
		);
	}

}

@Injectable({ providedIn: 'root' })
export class EmailNotTakenValidators implements AsyncValidator {

	constructor(protected userSrv: UserService) { }

	validate(control: AbstractControl): Observable<{ [errorName: string]: boolean }> {
		return this.userSrv.queryOneByPredicate(`email == "${control.value}"`, 'email').pipe(
			map(emailTaken => !!emailTaken),
			map(emailTaken => ({ emailTaken }))
		);
	}
}

