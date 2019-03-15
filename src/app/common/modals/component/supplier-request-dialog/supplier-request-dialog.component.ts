import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DialogService } from '~shared/dialog';
import { Product } from '~core/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'supplier-request-dialog-app',
	templateUrl: './supplier-request-dialog.component.html',
	styleUrls: ['./supplier-request-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierRequestDialogComponent implements OnInit {

	form: FormGroup;
	copyEmail = false;

	@Input() products: Product[];

	constructor(
		private fb: FormBuilder,
		private dlgSrv: DialogService
	) { }

	ngOnInit() {
		this.form = this.fb.group({
			template: ['', Validators.required],
			sendTo: ['', Validators.required],
			sendCopyTo: ['', Validators.required],
			requestTitle: ['', Validators.required],
			message: [''],
			shareInformation: ['']
		});
	}

}
