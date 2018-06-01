import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { take, takeUntil, catchError } from 'rxjs/operators';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'login-app',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss', '../form-style.scss'],
})
export class LoginComponent extends AutoUnsub implements OnInit {
	form: FormGroup;
	pending$ = new Subject<boolean>();
	error: string;

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

	}

	onSubmit() {
		if (this.form.valid) {
			this.pending$.next(true);
			this.srv.login(this.form.value).pipe(
				takeUntil(this._destroy$),
				take(1)
			).subscribe(
				r => this.pending$.next(false),
				e => { this.error = e.error; this.pending$.next(false); });
		}
	}

	forgotPw() {
		this.router.navigate(['../forgot-password'], { relativeTo: this.route });
	}
}
