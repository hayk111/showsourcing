import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { AutoUnsub } from '~utils';
import { AuthFormButton, AuthFormElement } from '../../shared';

@Component({
	selector: 'login-page-app',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends AutoUnsub implements OnInit {
	pending$ = new Subject<boolean>();
	error: string;
	queryParams: any;
	form: FormGroup = this.fb.group({
		username: ['', Validators.required],
		email: ['', Validators.required]
	});

	constructor(
		private srv: AuthenticationService,
		private router: Router,
		private route: ActivatedRoute,
		private fb: FormBuilder
	) {
		super();
	}

	ngOnInit() {
		// get return url from route parameters or default to '/'
		this.queryParams = this.route.snapshot.queryParams || '/';
	}

	signIn(form: FormGroup) {
		if (form.valid) {
			this.pending$.next(true);
			this.srv.signIn(form.value);
		}
	}

	onSuccess(r: any) {
		this.router.navigateByUrl(this.queryParams.returnUrl);
	}

}
