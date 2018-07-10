import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '~shared/dialog';
import { InputDirective } from '~shared/inputs';
import { PasswordValidator } from '~shared/inputs/validators/pswd.validator';
import { AutoUnsub } from '~utils';

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

	constructor(
		private fb: FormBuilder,
		private dlgSrv: DialogService
	) {
		super();
	}

	ngOnInit() {
		this.group = this.fb.group({
			currentPswd: ['', [Validators.required]],
			newPswd: ['', Validators.required],
			confirmPswd: ['', Validators.required]
		}, { validator: PasswordValidator });
	}

	ngAfterViewInit() {
		// setTimeout because we can't yet see the input
		setTimeout(() => this.input.focus(), 0);
	}

	onSubmit() {
		this.dlgSrv.close();
		throw Error(`method for changing password not implemented`);
	}


}
