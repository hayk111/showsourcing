import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromAuth from '~app/features/auth/store';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'login-app',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss', '../form-style.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
	form: FormGroup;
	pending$: Observable<boolean>;
	error$: Observable<string>;

	constructor(private store: Store<any>, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
		this.form = this.fb.group({
			identifier: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.required]
		});
	}

	ngOnInit() {
		this.pending$ = this.store.select(fromAuth.selectLoginPagePending);
		this.error$ = this.store.select(fromAuth.selectLoginPageError);
	}

	onSubmit() {
		if (this.form.valid)
			this.store.dispatch(fromAuth.AuthActions.login(this.form.value));
	}

	forgotPw() {
		this.router.navigate(['../forgot-password'], { relativeTo: this.route });
	}
}
