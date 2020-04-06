import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Typename } from '~core/erm3/typename.type';
import { DialogService } from '~shared/dialog';
import { InputDirective } from '~shared/inputs';

@Component({
	selector: 'creation-dialog-app',
	templateUrl: './default-creation-dialog.component.html',
	styleUrls: ['./default-creation-dialog.component.scss'],
})
export class DefaultCreationDialogComponent implements AfterViewInit {
	group: FormGroup = this.fb.group({
		name: ['', Validators.required],
	});
	@Input() typename: Typename;
	@Input() createAnother = false;

	@ViewChild(InputDirective, { static: false }) input: InputDirective;

	constructor(private fb: FormBuilder, private dlgSrv: DialogService) {}

	ngAfterViewInit() {
		if (this.input) this.input.focus();
	}

	cancel() {
		this.dlgSrv.cancel();
	}

	onSubmit() {
		if (!this.group.valid) return;
		const name = this.group.value.name.trim();
		this.dlgSrv.data({ name });
		if (this.createAnother) this.group.reset();
		else this.dlgSrv.close();
	}
}
