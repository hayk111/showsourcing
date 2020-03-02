import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { SettingsProfileService } from '~features/settings/services/settings-profile.service';
import { DialogService } from '~shared/dialog/services';
import { InputDirective } from '~shared/inputs';
import { PasswordMatchValidator } from '~shared/inputs/validators/password-match.validator';
import { ToastService } from '~shared/toast';
import { AutoUnsub } from '~utils';
import { passwordValidator } from '~shared/inputs/validators/password.validator';

@Component({
	selector: 'change-pswd-dlg-app',
	templateUrl: './change-pswd-dlg.component.html',
	styleUrls: ['./change-pswd-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePswdDlgComponent extends AutoUnsub implements OnInit {

	group: FormGroup;
	pending = false;
	@ViewChild(InputDirective, { static: false }) input: InputDirective;
	private onBlur$: Subject<string> = new Subject();
	isCurrentPswd$: Observable<boolean>;
	itemRandom: Observable<any>;

	constructor(
		private fb: FormBuilder,
		private dlgSrv: DialogService,
		private profileSrv: SettingsProfileService,
		private notificationSrv: ToastService,
		private translate: TranslateService
	) {
		super();
	}

	ngOnInit() {
		this.group = this.fb.group({
			currentPswd: ['', Validators.required],
			newPswd: ['', passwordValidator],
			confirmPswd: ['', passwordValidator],
		}, { validator: PasswordMatchValidator });

		// this.isCurrentPswd$ = this.onBlur$
		// 	.pipe(
		// 		takeUntil(this._destroy$),
		// 		switchMap((str) => this.profileSrv.checkCurrentPassword(str))
		// 	);
	}

	checkCurrentPassword() {
		if (this.group.get('currentPswd').errors == null)
			this.onBlur$.next(this.group.get('currentPswd').value);
	}

	onSubmit() {
		this.pending = true;
		// this.profileSrv.changePassword(this.group.value.currentPswd, this.group.value.confirmPswd).subscribe(response => {
		// 	this.pending = false;
		// 	if (response) {
		// 		this.notificationSrv.add({
		// 			type: ToastType.SUCCESS,
		// 			title: this.translate.instant('title.pwd-changed'),
		// 			message: this.translate.instant('message.pwd-changed'),
		// 			timeout: 3500
		// 		});
		// 	} else {
		// 		this.notificationSrv.add({
		// 			type: ToastType.ERROR,
		// 			title: this.translate.instant('title.pwd-unchanged'),
		// 			message: this.translate.instant('message.pwd-unchanged'),
		// 			timeout: 4500
		// 		});
		// 	}
		// 	this.dlgSrv.close();
		// })
	}


}
