import { ChangeDetectionStrategy, Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, take, delay } from 'rxjs/operators';
import { ContactService, CreateRequestService, RequestTemplateService, UserService } from '~core/entity-services';
import { Contact, CreateRequest, ERM, Product, Supplier, RequestTemplate } from '~core/models';
import { DialogService } from '~shared/dialog';
import { FilterList, FilterType } from '~shared/filters';
import { NotificationService, NotificationType } from '~shared/notifications';
import { ID, translate } from '~utils';

import { ReplySentDlgComponent } from '../reply-sent-dlg/reply-sent-dlg.component';
import { TemplateMngmtDlgComponent } from '~shared/template-mngmt/components/template-mngmt-dlg/template-mngmt-dlg.component';
import { of, Subject, Observable, ReplaySubject } from 'rxjs';

@Component({
	selector: 'supplier-request-dialog-app',
	templateUrl: './supplier-request-dialog.component.html',
	styleUrls: ['./supplier-request-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierRequestDialogComponent implements OnInit {

	private _request: CreateRequest;
	@Input() set request(request: CreateRequest) {
		this._request = request;
		this.initFormValues();
	}
	get request() {
		return this._request;
	}
	// if we don't initialize it the selector will try to push to an empty object
	private _products: Product[];
	@Input() set products(products: Product[]) {
		this._products = products || [];
		if (!this.request)
			this.request = new CreateRequest({ products: this._products, sendCopyTo: [], shareInformation: false });
	}
	get products() {
		return this._products;
	}
	form: FormGroup;
	copyEmail = false;
	pending = false;
	filterList = new FilterList([]);
	supplier: Supplier;
	private templateSelectedAction$ = new ReplaySubject<ID>(1);
	selectedTemplate$: Observable<RequestTemplate>;;

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
		if (!this.request)
			this.request = new CreateRequest({ products: [], sendCopyTo: [], shareInformation: false });
		this.form.patchValue(this.request);
		this.selectedTemplate$ = this.templateSelectedAction$.pipe(
			switchMap(id => this.requestTemplateSrv.queryOne(id))
		);

	}

	private initFormValues() {
		// title
		this.setTitle();
		// message
		// TODO i18n
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
		// template, selecting the first one
		this.setTemplate();
		// supplier, its not a form value but it has to be initialized
		this.setSupplier();
	}

	private setTemplate() {
		if (this.request && !this.request.requestTemplate) {
			this.requestTemplateSrv.queryOneByPredicate('targetedEntity == "Product"')
				.pipe(take(1))
				.subscribe(reqTemplate => {
					this.templateSelectedAction$.next(reqTemplate.id);
					this.form.patchValue({ requestTemplate: reqTemplate });
				});
		} else if (this.request && this.request.requestTemplate)
			this.templateSelectedAction$.next(this.request.requestTemplate.id);
	}

	private setSupplier() {
		// 1. find the first product that has a supplier
		const productWithSupplier = this.request.products.find(product => !!product.supplier);
		this.supplier = productWithSupplier && productWithSupplier.supplier;

		if (this.supplier) {
			this.filterList = new FilterList([{ type: FilterType.SUPPLIER, value: this.supplier.id }]);

			if (this.supplier.officeEmail) {
				// we do this since we want the email of the supplier to be selected by default to send the message
				// since we use contacts what this does is to check if we have an existing contact or
				// if we have to create a new one with that email
				this.contactSrv.queryOneByPredicate(`email == "${this.supplier.officeEmail}"`)
					.pipe(
						switchMap(contact => this.createOrUseContact(contact, this.supplier)),
						take(1)
					).subscribe(contact => this.form.patchValue({ recipient: contact }));

			} else { // we try to add the first email of that supplier
				this.contactSrv.queryOneByPredicate(`supplier.id == "${this.supplier.id}"`)
					.pipe(take(1))
					.subscribe(contact => this.form.patchValue({ recipient: contact }));
			}
		}
	}

	private createOrUseContact(contact: Contact, supplier: Supplier) {

		if (contact) {
			return of(contact);
		} else {
			const newContact = new Contact({
				email: supplier.officeEmail,
				name: supplier.name ? supplier.name : '',
				supplier: { id: supplier.id }
			});
			return this.contactSrv.create(newContact);
		}
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
		const prod = this.request.products.length === 1 ? translate('product') : translate('products');
		const reqFor = translate('Request for');
		this.form.get('title').setValue(`${reqFor} ${this.request.products.length} ${prod}`);
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
				this.dlgSrv.open(ReplySentDlgComponent, { actionName: translate(ERM.SUPPLIER_REQUEST.singular, 'erm') });
			}, err => {
				this.dlgSrv.close();
				this.notifSrv.add({
					title: 'Service error when creating request',
					type: NotificationType.ERROR,
					message: 'We could not create the request due to a server issue'
				});
			});
	}

	arrayToString(array: string[]) {
		return array.join(', ');
	}

	selectTemplate(tmp: RequestTemplate) {
		this.templateSelectedAction$.next(tmp.id);
	}

	openTemplateMngmtDialog(event: MouseEvent, templateSelected: RequestTemplate) {
		event.stopPropagation();
		const request = new CreateRequest(this.form.value);
		this.dlgSrv.open(TemplateMngmtDlgComponent, { templateSelected })
			// we are reopening this dlg when the other one closes
			.subscribe(({ type, data }) => {
				return this.dlgSrv.open(SupplierRequestDialogComponent, { request });
			});
	}

	getTemplateFields(tmp: RequestTemplate) {
		return tmp.requestedFields.map(f => f.label).join(', ');
	}

}
