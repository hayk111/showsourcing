import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { AutoUnsub } from '~utils';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'confirm-email-page-app',
	templateUrl: './confirm-email-page.component.html',
	styleUrls: ['./confirm-email-page.component.scss', '../../shared/form-style.scss']
})
export class ConfirmEmailPageComponent extends AutoUnsub implements OnInit {
	codeCtrl = new FormControl('', Validators.required);
	pending$ = new BehaviorSubject(false);
	private email: string;

	constructor(
		private authSrv: AuthenticationService,
		private route: ActivatedRoute
	) {
		super();
	}

	ngOnInit() {
		this.email = this.route.snapshot.queryParams.email;
		this.codeCtrl.valueChanges.pipe(
			takeUntil(this._destroy$),
			filter(x => !!x)
		).subscribe(value => this.checkCode(value));
	}

	async checkCode(value: string) {
		this.pending$.next(true);
		await this.authSrv.validateEmail(this.email, value);
		this.pending$.next(false);
	}
}

