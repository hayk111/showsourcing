import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { AutoUnsub } from '~utils';
import { AuthFormButton, AuthFormElement } from '../../shared';

@Component({
	selector: 'register-page-app',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent extends AutoUnsub implements OnInit {

	pending$ = new Subject<boolean>();
	pending = false;
	error: any = {};
	queryParams: any;
	form: FormGroup = this.fb.group({
		firstName: ['', Validators.required],
		lastName: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(8)]]
	}, { updateOn : 'change' });

	listForm: AuthFormElement[];
	buttons: AuthFormButton[];

	constructor(
		private authSrv: AuthenticationService,
		private router: Router,
		private route: ActivatedRoute,
		private cdRef: ChangeDetectorRef,
		private fb: FormBuilder
	) {
		super();
	}

	ngOnInit() {
		this.queryParams = this.route.snapshot.queryParams || '/';
	}

	createAccount() {
		if (this.form.valid) {
			this.pending$.next(true);
			// async await doesn't work as expected on angular on version 8
			// https://github.com/angular/angular/issues/31730
			this.authSrv.signUp(this.form.value)
			.then(_ => this.router.navigate(['/', 'auth', 'confirm-email']))
			.catch(e => this.error = e)
			.finally(() => this.pending$.next(false));
		}
	}

	forgotPw() {
		this.router.navigate(['../forgot-password'], { relativeTo: this.route });
	}
}

