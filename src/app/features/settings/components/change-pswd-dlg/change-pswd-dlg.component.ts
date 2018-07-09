import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AutoUnsub } from '~utils';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InputDirective } from '~shared/inputs';
import { Input } from '@angular/compiler/src/core';
import { DialogService } from '~shared/dialog';

@Component({
	selector: 'app-change-pswd-dlg',
	templateUrl: './change-pswd-dlg.component.html',
	styleUrls: ['./change-pswd-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePswdDlgComponent extends AutoUnsub implements OnInit {

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
			currentPswd: ['', Validators.required],
			newPswd: ['', Validators.required],
			confirmPswd: ['', Validators.required]
		});
	}

}
