import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { SettingsProfileService } from '~features/settings/services/settings-profile.service';
import { DialogService } from '~shared/dialog';
import { InputDirective } from '~shared/inputs';
import { PasswordValidator } from '~shared/inputs/validators/pswd.validator';
import { AutoUnsub, RegexpApp } from '~utils';

import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
	selector: 'change-pswd-dlg-app',
	templateUrl: './change-pswd-dlg.component.html',
	styleUrls: ['./change-pswd-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePswdDlgComponent extends AutoUnsub implements AfterViewInit, OnInit {

	group: FormGroup;
	pending = false;
	@ViewChild(InputDirective) input: InputDirective;
	private onBlur$: Subject<string> = new Subject();
	isCurrentPswd$: Observable<boolean>;

	constructor(
		private fb: FormBuilder,
		private dlgSrv: DialogService,
		private profileSrv: SettingsProfileService
	) {
		super();
	}

	ngOnInit() {
		this.group = this.fb.group({
			currentPswd: ['', Validators.required],
			newPswd: ['', [Validators.required, Validators.pattern(RegexpApp.PASSWORD_SPACE)]],
			confirmPswd: ['', [Validators.required, Validators.pattern(RegexpApp.PASSWORD_SPACE)]],
		}, { validator: PasswordValidator });
		// Uncomment when the service is implemented
		// this.isCurrentPswd$ = this.onBlur$
		// 	.pipe(
		// 		takeUntil(this._destroy$),
		// 		switchMap((str) => this.profileSrv.checkCurrentPassword(str))
		// 	);
	}

	ngAfterViewInit() {
		// setTimeout because we can't yet see the input
		setTimeout(() => this.input.focus(), 0);
	}

	checkCurrentPassword() {
		// if (this.group.get('currentPswd').errors == null)   // Uncomment when the service is implemented
		// this.onBlur$.next(this.group.get('currentPswd').value);
	}

	onSubmit() {
		this.pending = true;
		this.profileSrv.changePassword(this.group.value.confirmPswd);
		this.pending = false;
		this.dlgSrv.close();
		throw Error(`method for changing password not implemented`);
	}


}
