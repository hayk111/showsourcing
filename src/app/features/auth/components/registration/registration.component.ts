import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { AutoUnsub } from '~utils';
import { takeUntil, take, catchError } from 'rxjs/operators';

@Component({
	selector: 'registration-app',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss', '../form-style.scss']
})
export class RegistrationComponent extends AutoUnsub implements OnInit {
	form: FormGroup;
	pending: boolean;
	error: string;

	constructor(private authSrv: AuthenticationService, private fb: FormBuilder) {
		super();
	}

	ngOnInit() {
		this.form = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
		});
	}

	createAccount() {
		if (this.form.valid) {
			this.pending = true;
			this.authSrv.login(this.form.value).pipe(
				takeUntil(this._destroy$),
				take(1),
				catchError(error => this.error = error)
			).subscribe(r => this.pending = false);
		}
	}

}
