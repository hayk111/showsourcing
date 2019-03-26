import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DialogService } from '~shared/dialog';
import { Product, Contact, Supplier } from '~core/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ID } from '~utils';
import { ContactService } from '~core/entity-services';

interface Req {
	title: string;
	recipient?: Contact;
	message?: string;
	shareInformation?: boolean;
	sendCopyTo?: string[];
	products?: Product[];
}

@Component({
	selector: 'supplier-request-dialog-app',
	templateUrl: './supplier-request-dialog.component.html',
	styleUrls: ['./supplier-request-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierRequestDialogComponent implements OnInit {

	form: FormGroup;
	copyEmail = false;
	request: Req = { title: '', sendCopyTo: [] };
	// if we open once the supplier selector, we want it open until the dialog closes
	opened = false;

	@Input() products: Product[];

	constructor(
		private fb: FormBuilder,
		private dlgSrv: DialogService
	) {
		this.form = this.fb.group({
			products: ['', Validators.required],
			// requestTemplate: ['', Validators.required],
			recipient: ['', Validators.required],
			sendCopyTo: [''],
			title: ['', Validators.required],
			message: [''],
			// shareInformation: ['']
		});
	}

	ngOnInit() {
		this.request.products = this.products;
		this.form.patchValue(this.request);
	}

	removeProduct(id: ID) {
		this.products = this.products.filter(product => product.id !== id);
		this.request.products = this.products;
	}

}
