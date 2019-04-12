import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateRequestService, UserService } from '~core/entity-services';
import { CreateRequest, Product, Supplier } from '~core/models';
import { DialogService } from '~shared/dialog';
import { NotificationService, NotificationType } from '~shared/notifications';
import { ID } from '~utils';

import { ReplySentDlgComponent } from '../reply-sent-dlg/reply-sent-dlg.component';
import { FilterList, FilterType } from '~shared/filters';

@Component({
	selector: 'supplier-request-dialog-app',
	templateUrl: './supplier-request-dialog.component.html',
	styleUrls: ['./supplier-request-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierRequestDialogComponent implements OnInit {

	form: FormGroup;
	copyEmail = false;
	request: CreateRequest;
	pending = false;
	// if we open once the supplier selector, we want it open until the dialog closes
	opened = false;
	filterList: FilterList;
	supplier: Supplier;

	// if we don't initialize it the selector will try to push to an empty object
	@Input() products: Product[] = [];

	constructor(
		private fb: FormBuilder,
		private dlgSrv: DialogService,
		private requestSrv: CreateRequestService,
		private notifSrv: NotificationService,
		private userSrv: UserService
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
		this.request = new CreateRequest({ products: [], sendCopyTo: [], shareInformation: false });
		this.request.products = this.products;
		this.initFormValues();
		this.form.patchValue(this.request);
	}

	private initFormValues() {
		// title
		this.form.get('title').setValue(`Request for ${this.products.length} product${this.products.length === 1 ? '' : 's'}`);
		// message
		let event;
		const firstName = this.userSrv.userSync.firstName || '';
		const lastName = this.userSrv.userSync.lastName || '';
		this.form.get('message').setValue(
			'Hello,\n' +
			(this.products.length && (event = this.products[0].event) && event.description && event.description.name ?
				'\nWe have met during ' + event.description.name + '.\n' : '') +
			'\nCould you fill the information attached?\n' +
			'\nThank you\n' +
			(firstName ? firstName + ' ' + lastName : lastName)
		);

	}

	removeProduct(id: ID) {
		this.products = this.products.filter(product => product.id !== id);
		this.request.products = this.products;
		this.form.patchValue(this.request);
	}

	updateProducts(products: Product[]) {
		this.request.products = products;
		this.form.patchValue(this.request);
	}

	updateSupplier(supplier: Supplier) {
		this.supplier = supplier;
	}

	createRequest() {
		if (!this.form.valid)
			return;
		const newRequest = { ...this.request, ...this.form.value };
		newRequest.products = newRequest.products.map(product => ({ id: product.id }));
		this.pending = true;
		this.requestSrv.create(newRequest)
			.subscribe(_ => {
				this.pending = false;
				this.dlgSrv.open(ReplySentDlgComponent, { height: '586px', actionName: 'request' });
			},
				err => {
					this.dlgSrv.close();
					this.notifSrv.add({
						title: 'Service error when creating request',
						type: NotificationType.ERROR,
						message: 'We could not create the request due to a server issue'
					});
				}
			);
	}

	arrayToString(array: string[]) {
		return array.join(', ');
	}

}
