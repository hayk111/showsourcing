import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { AutoUnsub } from '~utils/auto-unsub.component';

@Component({
	selector: 'complete-new-password-page-app',
	templateUrl: './complete-new-password-page.component.html',
	styleUrls: ['./complete-new-password-page.component.scss', '../../shared/form-style.scss']
})
export class CompleteNewPasswordPageComponent extends AutoUnsub implements OnInit {

	pending$ = new BehaviorSubject(false);
	form = this.fb.group({
		firstName: ['', [Validators.required]],
		lastName: ['', [Validators.required]],
		password: ['', [Validators.required]],
		confirmPassword: ['', [Validators.required]]
	});
	username: string;
	error: string;

	constructor(
		private authSrv: AuthenticationService,
		private route: ActivatedRoute,
		private fb: FormBuilder
	) {
		super();
	}

	ngOnInit() {
		this.username = this.route.snapshot.queryParamMap.get('username');
	}

	onSubmit() {
		if (this.form.valid ) {
			this.pending$.next(true);
			const { firstName, lastName, password} = this.form.value;
			this.authSrv.completeNewPassword(this.username, password, { firstName, lastName })
			.catch (e => this.error = e.code)
			.finally(() => this.pending$.next(false));
		}
	}
}
