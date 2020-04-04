import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '~core/erm3/services/api.service';
import { Typename } from '~core/erm3/typename.type';
import { InputDirective } from '~shared/inputs';
import { DialogService, CloseEventType } from '~shared/dialog';

@Component({
	selector: 'creation-dialog-app',
	templateUrl: './default-creation-dialog.component.html',
	styleUrls: ['./default-creation-dialog.component.scss']
})
export class DefaultCreationDialogComponent implements AfterViewInit {

	group: FormGroup = this.fb.group({
		name: ['', Validators.required]
	});
	pending = false;
	@Input() typename: Typename;

	@ViewChild(InputDirective, { static: false }) input: InputDirective;

	constructor(
		private fb: FormBuilder,
		private dialogSrv: DialogService,
	) {  }

	ngAfterViewInit() {
		if (this.input)
			this.input.focus();
	}

	onSubmit(redirect = true) {
		if (!this.group.valid)
			return;
		const name = this.group.value.name.trim();
		this.pending = true;
		this.dialogSrv.data({entity: {name}});
	}

}
