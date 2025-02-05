import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, ReplaySubject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ContactService, CreateRequestService, RequestTemplateService, UserService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { Contact, CreateRequest, ERM, Product, RequestTemplate, Supplier } from '~core/models';
import { ProductService } from '~entity-services';
import { DialogService } from '~shared/dialog';
import { FilterList, FilterType } from '~shared/filters';
import { NotificationService, NotificationType } from '~shared/notifications';
import {
	TemplateMngmtDlgComponent,
} from '~shared/template-mngmt/components/template-mngmt-dlg/template-mngmt-dlg.component';
import { ID } from '~utils';

import { ReplySentDlgComponent } from '../reply-sent-dlg/reply-sent-dlg.component';
import { TranslateService } from '@ngx-translate/core';
import { ProductSelectDlgComponent } from '~common/dialogs/selection-dialogs';

@Component({
	selector: 'supplier-request-dialog-app',
	templateUrl: './supplier-request-dialog.component.html',
	styleUrls: ['./supplier-request-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ListPageService]
})
export class SupplierRequestDialogComponent implements OnInit, AfterViewChecked {

	private _request: CreateRequest;
	@Input() set request(request: CreateRequest) {
		this._request = request;
		if (request && request.recipient && request.recipient.supplier)
			this.supplier = request.recipient.supplier;
		this.setTemplate();
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
	// wether if we come from the template dialog or not
	@Input() fromTemplateDlg = false;

	form: FormGroup;
	copyEmail = false;
	pending = false;
	filterList = new FilterList([]);
	supplier: Supplier;
	private templateSelectedAction$ = new ReplaySubject<ID>(1);
	selectedTemplate$: Observable<RequestTemplate>;

	constructor(
		private fb: FormBuilder,
		private dlgSrv: DialogService,
		private requestSrv: CreateRequestService,
		private contactSrv: ContactService,
		private notifSrv: NotificationService,
		private userSrv: UserService,
		private requestTemplateSrv: RequestTemplateService,
		private productSrv: ProductService,
		private cd: ChangeDetectorRef,
		public listSrv: ListPageService<Product, ProductService>,
		private translate: TranslateService
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
		if (!this.fromTemplateDlg)
			this.initFormValues();
	}

	ngAfterViewChecked() {
		this.cd.detectChanges();
	}

	private initFormValues() {
		// title
		this.setTitle();
		// message
		this.setMessage();
		// template, selecting the first one
		this.setTemplate();
		// supplier, its not a form value but it has to be initialized
		this.setSupplier();
	}

	private setTitle() {
		// TODO i18n and check for other langs
		const prod = this.request.products.length === 1 ? this.translate.instant('label.product') : this.translate.instant('label.products');
		const reqFor = this.translate.instant('label.request-for');
		const title = `${reqFor} ${this.request.products.length} ${prod}`;
		this.request = { ...this.request, title };
		this.form.patchValue(this.request);
	}

	private setMessage() {
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
	}

	private setTemplate() {
		if (this.request && !this.request.requestTemplate) {
			this.requestTemplateSrv.queryOneByPredicate('targetedEntity == "Product"')
				.pipe(take(1))
				.subscribe(reqTemplate => {
					if (reqTemplate) {
						this.templateSelectedAction$.next(reqTemplate.id);
						this.request = { ...this.request, requestTemplate: reqTemplate };
						this.form.patchValue(this.request);
					}
				});
		} else if (this.request && this.request.requestTemplate)
			this.templateSelectedAction$.next(this.request.requestTemplate.id);
	}

	private setSupplier() {
		// 1. find the first product that has a supplier, if we have not selected a supplier yet
		if (!this.supplier) {
			const productWithSupplier = this.request.products.find(product => !!product.supplier);
			this.supplier = productWithSupplier && productWithSupplier.supplier;
		}

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
					).subscribe(contact => {
						this.request = { ...this.request, recipient: contact };
						this.form.patchValue(this.request);
					});

			} else { // we try to add the first email of that supplier
				this.contactSrv.queryOneByPredicate(`supplier.id == "${this.supplier.id}" AND email contains "@"`)
					.pipe(take(1))
					.subscribe(contact => {
						this.request = { ...this.request, recipient: contact };
						this.form.patchValue(this.request);
					});
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
			this.request = { ...this.request, recipient: { ...contact, supplier: { id: this.supplier.id, name: this.supplier.name } } };
			this.contactSrv
				.update({ id: contact.id, supplier: { id: this.supplier.id } })
				.subscribe(_ => this.form.patchValue(this.request));
		}
	}

	addProduct(ev: any) {
		this.productSrv.selectedProds$.subscribe((products: Product[]) => {
			products.forEach((product: Product) => {
				if (this._products.filter((p: Product) => p.id === product.id).length === 0) {
					this._products.push(product);
				}
			});

			setTimeout(_ => this.dlgSrv.open(SupplierRequestDialogComponent, { products: this._products }));
		});

		setTimeout(_ => {
			this.dlgSrv.open(ProductSelectDlgComponent, { initialSelectedProducts: [], submitProducts: false })
				.pipe(
					switchMap(_ => this.listSrv.refetch())
				).subscribe();
		});
	}

	removeProduct(id: ID) {
		const products = this.request.products.filter(product => product.id !== id);
		this.request = { ...this.request, products };
		this.setTitle();
	}

	updateProducts(products: Product[]) {
		this.request = { ...this.request, products };
		this.setTitle();
	}

	updateSupplier(supplier: Supplier) {
		this.supplier = supplier;
		this.form.get('recipient').reset();
		this.setSupplier();
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
				this.dlgSrv.open(ReplySentDlgComponent, { actionName: this.translate.instant('ERM.SUPPLIER_REQUEST.singular') });
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
		let request = new CreateRequest(this.form.value);
		this.dlgSrv.open(TemplateMngmtDlgComponent, { templateSelected })
			// we are reopening this dlg when the other one closes
			.subscribe(({ type, data }) => {
				// we update the request with the latest tempalte selected if there is any
				if (data && data.template)
					request = ({ ...request, requestTemplate: data.template });
				return this.dlgSrv.open(SupplierRequestDialogComponent, { request, fromTemplateDlg: true });
			});
	}

	getTemplateFields(tmp: RequestTemplate) {
		return tmp.requestedFields.map(f => f.label).join(', ');
	}

}
