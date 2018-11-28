import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { PasswordValidator } from '~shared/inputs/validators/pswd.validator';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { NotificationService, NotificationType } from '~shared/notifications';

@Component({
	selector: 'reset-password-app',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss', '../form-style.scss']
})
export class ResetPasswordComponent extends AutoUnsub implements OnInit {
	form: FormGroup;
	pending: boolean;
	error: string;
	token: string;

	constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef,
		private authSrv: AuthenticationService, private router: Router,
		private route: ActivatedRoute, private notificationSrv: NotificationService
	) {
		super();
		this.form = this.fb.group({
			newPswd: ['', Validators.required],
			confirmPswd: ['', Validators.required],
		}, { validator: PasswordValidator });

		this.token = this.route.snapshot.params.token;
	}

	ngOnInit() {
	}

	onSubmit() {
		if (this.form.valid) {
			this.pending = true;
			this.authSrv.confirmResetPassword({
				password: this.form.get('confirmPswd').value,
				token: this.token
			}).pipe(
				catchError(error => {
					if (error.error && error.error.errors && error.error.errors.length > 0) {
						this.error = error.error.errors[0];
					} else {
						this.error = 'Error when resetting password';
					}
					this.notificationSrv.add({
						type: NotificationType.ERROR,
						title: 'Password Reset',
						message: this.error,
						timeout: 4500
					});
					return throwError(error);
				})
			).subscribe(r => {
				this.pending = false;
				this.router.navigate(['auth', 'login']);
				this.notificationSrv.add({
					type: NotificationType.SUCCESS,
					title: 'Password Reset',
					message: 'Password successfully restored',
					timeout: 3500
				});
			}, err => {
				this.pending = false;
				this.cdr.detectChanges();
			});
		}
	}
}
