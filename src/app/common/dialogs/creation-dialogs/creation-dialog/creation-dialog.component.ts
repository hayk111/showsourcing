import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '~core/erm3/services/api.service';
import { Typename } from '~core/erm3/typename.type';
import { InputDirective } from '~shared/inputs';

@Component({
	selector: 'creation-dialog-app',
	templateUrl: './creation-dialog.component.html',
	styleUrls: ['./creation-dialog.component.scss']
})
export class CreationDialogComponent implements AfterViewInit {

	group: FormGroup = this.fb.group({
		name: ['', Validators.required]
	});
	pending = false;
	@Input() typename: Typename;
	// extra properties to put on the object
	@Input() extra: any;
	/** whether we display buttons create & stay + create & go */
	@Input() canRedirect = false;
	@ViewChild(InputDirective, { static: false }) input: InputDirective;

	constructor(
		private fb: FormBuilder,
		private apiSrv: ApiService
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
		this.apiSrv.create<any>(this.typename, { name });
	}

}
