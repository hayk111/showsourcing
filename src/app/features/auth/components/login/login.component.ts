import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '~app/features/auth/services/authentication.service';
import { take, takeUntil, catchError } from 'rxjs/operators';
import { AutoUnsub } from '~app/app-root/utils';

@Component({
	selector: 'login-app',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss', '../form-style.scss'],
})
export class LoginComponent extends AutoUnsub implements OnInit {
	form: FormGroup;
	pending: boolean;
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
			this.pending = true;
			this.srv.login(this.form.value).pipe(
				takeUntil(this._destroy$),
				take(1),
				catchError(error => this.error = error)
			).subscribe(r => this.pending = false);
		}
	}

	forgotPw() {
		this.router.navigate(['../forgot-password'], { relativeTo: this.route });
	}
}
