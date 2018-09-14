import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { Product, ProductConfig, ERM, Contact } from '~models';
import { Observable, ReplaySubject } from 'rxjs';
import { FormDescriptor, CustomField } from '~shared/dynamic-forms';
import { FormGroup } from '@angular/forms';
import { AutoUnsub } from '~utils';
import { takeUntil, distinctUntilChanged, map, tap, first } from 'rxjs/operators';
import { ProductFeatureService } from '~features/products/services';
import { DialogService } from '~shared/dialog';
import { RfqDialogComponent } from '~features/products/components/rfq-dialog/rfq-dialog.component';
import { ProductModule } from '~features/products';
import { NgModuleRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProductAddToProjectDlgComponent } from '~shared/custom-dialog';

@Component({
	selector: 'product-preview-app',
	templateUrl: './product-preview.component.html',
	styleUrls: ['./product-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPreviewComponent extends AutoUnsub implements OnInit {
	/** This is the product passed as input, but it's not yet fully loaded */
	@Input() product: Product;
	@Output() close = new EventEmitter<any>();
	descriptor$ = new ReplaySubject<FormDescriptor>(1);
	descriptor2$ = new ReplaySubject<FormDescriptor>(1);
	/** this is the fully loaded product */
	product$: Observable<Product>;
	/** Contacts given a supplier of the product */
	contacts: Array<Contact>;
	prodERM = ERM.PRODUCT;

	// those are the custom fields for the first form section
	// ultimately "sections" should be added to the form descriptor
	// so we only have one array of custom fields
	customFields: CustomField[] = [
		{ name: 'supplier', type: 'selector', metadata: { target: 'supplier', type: 'entity', labelName: 'name', canCreate: true } },
		{ name: 'category', type: 'selector', metadata: { target: 'category', type: 'entity', labelName: 'name', canCreate: true } },
		{ name: 'name', type: 'text', required: true, label: 'name' },
		{ name: 'price', type: 'price' },
		{ name: 'createdBy', type: 'selector', metadata: { target: 'user', type: 'entity', labelName: 'name' } },
		{
			name: 'createdBy', label: 'Assignee', type: 'selector', metadata:
				{ target: 'user', type: 'entity', labelName: 'name' }
		},
		{ name: 'minimumOrderQuantity', type: 'number', label: 'MOQ' },
		{ name: 'moqDescription', type: 'text', label: 'MOQ description' },
		{
			name: 'event', label: 'Found at', type: 'selector',
			metadata: { target: 'event', type: 'entity', labelName: 'name', canCreate: true }
		},
		{ name: 'tags', type: 'selector', metadata: { target: 'tag', type: 'entity', labelName: 'name', canCreate: true }, multiple: true },
		{ name: 'description', type: 'textarea', label: 'description' },
	];

	// those are the custom field for the second form section
	customFields2: CustomField[] = [
		{ name: 'innerCarton', type: 'packaging', label: 'inner carton' },
		{ name: 'masterCarton', type: 'packaging', label: 'master carton' },
		// { name: 'samplePrice', type: 'number', label: 'Sample Price' },
		{ name: 'priceMatrix', type: 'priceMatrix', label: 'price matrix' },
		{ name: 'sample', type: 'yesNo' },
		{ name: 'samplePrice', type: 'number', label: 'Sample Price' },
	];

	constructor(
		private featureSrv: ProductFeatureService,
		private dlgSrv: DialogService,
		private module: NgModuleRef<any>,
		private router: Router) {
		super();
	}

	ngOnInit() {
		// creating the form descriptor
		this.product$ = this.featureSrv.selectOne(this.product.id);
		this.product$.pipe(
			takeUntil(this._destroy$),
			map(product => new FormDescriptor(this.customFields, product)),
		).subscribe(this.descriptor$);
		this.product$.pipe(
			takeUntil(this._destroy$),
			map(product => new FormDescriptor(this.customFields2, product))
		).subscribe(this.descriptor2$);
		/* this.featureSrv.getContacts(this.product.supplier.id).pipe(
			takeUntil(this._destroy$)
		).subscribe(supp => this.contacts = supp.contacts); */
	}

	/** when we receive back the form from the dynamic form component we subscribe to changes to it and
	 * update the product
	 */
	onFormCreated(form: FormGroup) {
		form.valueChanges
			.pipe(
				takeUntil(this._destroy$),
				distinctUntilChanged()
			).subscribe(product => this.updateProduct(product));
	}

	updateProduct(product: any) {
		this.featureSrv.update({ id: this.product.id, ...product }).subscribe();
	}

	openRfq() {
		// TODO: contacts must be loaded from the RfqDialog itself
		// we add manually the supplier self email, since it is not on the contacts
		/* if (this.contacts && this.product.supplier.officeEmail) {
			this.contacts.push({ name: this.product.supplier.name || 'Unnamed', email: this.product.supplier.officeEmail, jobTitle: null });
		} else if (!this.contacts && this.product.supplier.officeEmail) {
			this.contacts = [{
				name: this.product.supplier.name || 'Unnamed',
				email: this.product.supplier.officeEmail,
				jobTitle: null
			}];
		}
		this.dlgSrv.openFromModule(RfqDialogComponent, this.module,
			{
				product: this.product,
				contacts: this.contacts
			});
		this.dlgSrv.openFromModule(RfqDialogComponent, this.module, { product: this.product, contacts: this.contacts }); */
	}

	onViewProduct() {
		this.router.navigate(['product', 'details', this.product.id]);
	}

	openAddToProject() {
		this.dlgSrv.openFromModule(ProductAddToProjectDlgComponent, this.module, { selectedProducts: [this.product] });
	}

}