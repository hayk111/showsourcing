import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { AutoUnsub } from '~utils';
import { takeUntil, take, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
	selector: 'registration-app',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss', '../form-style.scss']
})
export class RegistrationComponent extends AutoUnsub implements OnInit {
	form: FormGroup;
	pending$ = new Subject<boolean>();
	error: string;

	constructor(private authSrv: AuthenticationService, private fb: FormBuilder, private router: Router) {
		super();
	}

	ngOnInit() {
		this.form = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([
				Validators.required, Validators.minLength(8)
			])]
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
					this.pending$.next(false);
					this.router.navigate(['']);
				},
				e => {
					if (e.error && e.error.errors && e.error.errors.email) {
						this.error = e.error.errors.email.msg;
					} else {
						this.error = e.error.message;
					}
					this.pending$.next(false);
				}
			);
		}
	}

}
