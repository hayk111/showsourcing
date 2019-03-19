import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { AuthFormButton, AuthFormElement } from '~common/auth-pages/components';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'registration-app',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss', '../../../../common/auth-pages/components/form-style.scss']
})
export class RegistrationComponent extends AutoUnsub implements OnInit {

	pending$ = new Subject<boolean>();
	error: string;
	queryParams: any;
	filedFocused = 'firstName';

	listForm: AuthFormElement[];
	buttons: AuthFormButton[];

	constructor(
		private authSrv: AuthenticationService,
		private router: Router,
		private route: ActivatedRoute,
	) {
		super();
	}

	ngOnInit() {
		this.queryParams = this.route.snapshot.queryParams || '/';

		this.listForm = [{
			label: 'First Name',
			type: 'text',
			name: 'firstName',
			isRequired: true,
			autoComplete: 'given-name',
			placeHolder: 'Your first name',
			validators: [Validators.required]
		}, {
			label: 'Last Name',
			type: 'text',
			name: 'lastName',
			isRequired: true,
			autoComplete: 'family-name',
			placeHolder: 'Your last name',
			validators: [Validators.required]
		}, {
			label: 'Email',
			type: 'email',
			name: 'email',
			isRequired: true,
			autoComplete: 'current-email',
			placeHolder: 'example@showsourcing.com',
			validators: [Validators.required, Validators.email],
			hint: 'Tip: the app works better with a company email',
			error: {
				type: null,
				msg: 'Please pick another email'
			}
		}, {
			label: 'Password',
			type: 'password',
			name: 'password',
			isRequired: true,
			autoComplete: 'current-password',
			placeHolder: 'your password',
			validators: [Validators.required],
			error: {
				type: 'minlength',
				msg: 'Minimum 8 characters required'
			}
		}];
		this.buttons = [{
			label: 'Sign Up',
			type: 'button'
		}, {
			label: 'Already have an account?',
			type: 'link',
			link: ['../login'],
			queryParams: this.queryParams
		}];
	}

	createAccount(form: FormGroup) {
		if (form.valid) {
			this.pending$.next(true);
			this.authSrv.register(form.value).pipe(
				takeUntil(this._destroy$),
				take(1),
			).subscribe(
				r => this.router.navigateByUrl(this.queryParams.returnUrl),
				e => this.onError(e, form)
			);
		}
	}

	onError(error: any, form: FormGroup) {
		this.pending$.next(false);
		if (error.error && error.error.errors && error.error.errors.email) {
			form.get('email').markAsPristine();
			this.error = 'An account already exist with this email address.';
		} else {
			this.error = error.error.message;
		}
	}

	forgotPw() {
		this.router.navigate(['../forgot-password'], { relativeTo: this.route });
	}
}

