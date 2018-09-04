import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';
import { SettingsProfileService } from '~features/settings/services/settings-profile.service';
import { DialogService } from '~shared/dialog';
import { InputDirective } from '~shared/inputs';
import { PasswordValidator } from '~shared/inputs/validators/pswd.validator';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'change-pswd-dlg-app',
	templateUrl: './change-pswd-dlg.component.html',
	styleUrls: ['./change-pswd-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePswdDlgComponent extends AutoUnsub implements OnInit {

	group: FormGroup;
	pending = false;
	@ViewChild(InputDirective) input: InputDirective;
	private onBlur$: Subject<string> = new Subject();
	isCurrentPswd$: Observable<boolean>;
	itemRandom: Observable<any>;

	constructor(
		private fb: FormBuilder,
		private dlgSrv: DialogService,
		private profileSrv: SettingsProfileService,
		private notificationSrv: NotificationService) {
		super();
	}

	ngOnInit() {
		this.group = this.fb.group({
			currentPswd: ['', Validators.required],
			newPswd: ['', Validators.required],
			confirmPswd: ['', Validators.required],
		}, { validator: PasswordValidator });

		this.isCurrentPswd$ = this.onBlur$
			.pipe(
				takeUntil(this._destroy$),
				switchMap((str) => this.profileSrv.checkCurrentPassword(str))
			);
	}

	checkCurrentPassword() {
		if (this.group.get('currentPswd').errors == null)
			this.onBlur$.next(this.group.get('currentPswd').value);
	}

	onSubmit() {
		this.pending = true;
		this.profileSrv.changePassword(this.group.value.confirmPswd).subscribe(response => {
			this.pending = false;
			if (response) {
				this.notificationSrv.add({
					type: NotificationType.SUCCESS,
					title: 'Password Changed',
					message: 'Your password has been changed with success',
					timeout: 3500
				});
			} else {
				this.notificationSrv.add({
					type: NotificationType.ERROR,
					title: 'Password Uncghanged',
					message: 'Your password could not be changed, server issues',
					timeout: 4500
				});
			}
			this.dlgSrv.close();
		});
	}


}
