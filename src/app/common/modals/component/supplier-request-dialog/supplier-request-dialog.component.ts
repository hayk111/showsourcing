import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take, switchMap } from 'rxjs/operators';
import { ContactService, CreateRequestService, RequestTemplateService, UserService } from '~core/entity-services';
import { Contact, CreateRequest, Product, Supplier } from '~core/models';
import { DialogService } from '~shared/dialog';
import { FilterList, FilterType } from '~shared/filters';
import { NotificationService, NotificationType } from '~shared/notifications';
import { ID } from '~utils';

import { ReplySentDlgComponent } from '../reply-sent-dlg/reply-sent-dlg.component';

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
	filterList = new FilterList([]);
	supplier: Supplier;

	// if we don't initialize it the selector will try to push to an empty object
	@Input() products: Product[] = [];

	constructor(
		private fb: FormBuilder,
		private dlgSrv: DialogService,
		private requestSrv: CreateRequestService,
		private contactSrv: ContactService,
		private notifSrv: NotificationService,
		private userSrv: UserService,
		private requestTemplateSrv: RequestTemplateService
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
		this.setTitle();
		// message
		let event;
		const firstName = this.userSrv.userSync.firstName || '';
		const lastName = this.userSrv.userSync.lastName || '';
		this.form.get('message').setValue(
			'Hello,\n' +
			(this.request.products.length && (event = this.request.products[0].event) && event.description && event.description.name ?
				'\nWe have met during ' + event.description.name + '.\n' : '') +
			'\nCould you fill the information attached?\n' +
			'\nThank you\n' +
			(firstName ? firstName + ' ' + lastName : lastName)
		);
		// template
		this.requestTemplateSrv.queryOneByPredicate('targetedEntity == "Product"')
			.pipe(take(1))
			.subscribe(reqTemplate => {
				if (reqTemplate) {
					this.form.get('requestTemplate').setValue(reqTemplate);
					this.form.patchValue(this.request);
				}
			});
		// supplier, its not a form value but it has to be initialized
		const tempProduct = this.request.products.find(product => !!product.supplier);
		this.supplier = tempProduct && tempProduct.supplier ? tempProduct.supplier : null;
		if (this.supplier) {
			this.filterList = new FilterList([{ type: FilterType.SUPPLIER, value: this.supplier.id }]);

			if (this.supplier.officeEmail) {
				// we do this since we want the email of the supplier to be selected by default to send the message
				// since we use contacts what this does is check if we have an existing contact or if we have to create a new one with that email
				this.contactSrv.queryOneByPredicate(`email == "${this.supplier.officeEmail}"`)
					.pipe(
						switchMap(contact => this.createOrUseContact(contact, this.supplier)),
						take(1)
					)
					.subscribe(contact => {
						this.form.get('recipient').setValue(contact);
						this.form.patchValue(this.request);
					});
			}
		}
	}

	private createOrUseContact(contact: Contact, supplier: Supplier) {
		const finalContact = contact ? contact : new Contact({ email: supplier.officeEmail, name: supplier.name ? supplier.name : '' });
		return contact ? this.contactSrv.queryOne(finalContact.id) : this.contactSrv.create(finalContact);
	}

	contactUpdate(contact: Contact) {
		// we only check the new contacts (those who doesn't have a supplier)
		if (contact && !contact.supplier) {
			// we update the contact on the form and on realm, since it's a new contact and we have to insert a supplier
			// other wise when we create the request its gona get the form value and the supplier will be null again
			this.form.get('recipient').setValue({ ...contact, supplier: { id: this.supplier.id } });
			this.contactSrv.update({ id: contact.id, supplier: { id: this.supplier.id } }).subscribe();
		}
	}

	private setTitle() {
		this.form.get('title').setValue(`Request for ${this.request.products.length} product${this.request.products.length === 1 ? '' : 's'}`);
	}

	removeProduct(id: ID) {
		const products = this.request.products.filter(product => product.id !== id);
		this.request = { ...this.request, products };
		this.setTitle();
		this.form.patchValue(this.request);
	}

	updateProducts(products: Product[]) {
		this.request = { ...this.request, products };
		this.setTitle();
		this.form.patchValue(this.request);
	}

	updateSupplier(supplier: Supplier) {
		this.supplier = supplier;
		this.form.get('recipient').reset();
		this.filterList = new FilterList([{ type: FilterType.SUPPLIER, value: supplier.id }]);
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
