import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SettingsProfileService } from '~features/settings/services/settings-profile.service';
import { DialogService } from '~shared/dialog/services';
import { InputDirective } from '~shared/inputs';
import { PasswordValidator } from '~shared/inputs/validators/pswd.validator';
import { ToastService, ToastType } from '~shared/toast';
import { AutoUnsub } from '~utils';
import { TranslateService } from '@ngx-translate/core';

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
