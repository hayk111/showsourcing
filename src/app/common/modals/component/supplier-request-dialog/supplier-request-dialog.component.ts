import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DialogService } from '~shared/dialog';
import { Product, Contact, Supplier, Request } from '~core/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ID } from '~utils';
import { ContactService, RequestService } from '~core/entity-services';
import { NotificationService } from '~shared/notifications';

@Component({
	selector: 'supplier-request-dialog-app',
	templateUrl: './supplier-request-dialog.component.html',
	styleUrls: ['./supplier-request-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierRequestDialogComponent implements OnInit {

	form: FormGroup;
	copyEmail = false;
	request: Request;
	// if we open once the supplier selector, we want it open until the dialog closes
	opened = false;

	@Input() products: Product[];

	constructor(
		private fb: FormBuilder,
		private dlgSrv: DialogService,
		private requestSrv: RequestService,
		private notifSrv: NotificationService
	) {
		this.form = this.fb.group({
			products: ['', Validators.required],
			requestTemplate: ['', Validators.required],
			recipient: ['', Validators.required],
			sendCopyTo: [''],
			title: ['', Validators.required],
			message: [''],
			shareInformation: ['']
		});
	}

	ngOnInit() {
		this.request = new Request({ products: [], sendCopyTo: [], shareInformation: false, status: 'pending' });
		this.request.products = this.products;
		this.form.patchValue(this.request);
	}

	removeProduct(id: ID) {
		this.products = this.products.filter(product => product.id !== id);
		this.request.products = this.products;
	}

	createRequest() {
		if (this.form.valid)
			this.requestSrv.create({ ...this.request, ...this.form.value }).subscribe(_ => this.dlgSrv.close()
				// TODO write 2 cases succes, error
			);
	}

	arrayToString(array: string[]) {
		return array.join(', ');
	}

}
