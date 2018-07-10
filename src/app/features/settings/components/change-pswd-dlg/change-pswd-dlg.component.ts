import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { AutoUnsub } from '~utils';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { InputDirective, phoneValidator } from '~shared/inputs';
import { Input } from '@angular/compiler/src/core';
import { DialogService } from '~shared/dialog';
import { PasswordValidator } from '~shared/inputs/validators/pswd.validator';

@Component({
	selector: 'app-change-pswd-dlg',
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
			currentPswd: ['', [Validators.required, Validators.minLength(4)]],
			newPswd: ['', Validators.required],
			confirmPswd: ['', Validators.required]
		}, { validator: PasswordValidator });
	}

	ngAfterViewInit() {
		// setTimeout because we can't yet see the input
		setTimeout(() => this.input.focus(), 0);
	}
	test() {
		console.log(this.group);
	}

}
