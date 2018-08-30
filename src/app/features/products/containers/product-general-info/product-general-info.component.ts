import { Component, OnInit, ViewChild, ElementRef, NgModuleRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap, takeUntil, tap, map, distinctUntilChanged, first } from 'rxjs/operators';
import { FormDescriptor, CustomField } from '~shared/dynamic-forms';
import { Event, ERM, Contact } from '~models';
import { Product } from '~models';
import { Project, Tag } from '~models';
import { AutoUnsub } from '~utils';
import { ProductFeatureService } from '~features/products/services';
import { FormGroup } from '@angular/forms';
import { EditableTextComponent } from '~shared/editable-field';
import { DialogService } from '~shared/dialog';
import { RfqDialogComponent } from '~features/products/components/rfq-dialog/rfq-dialog.component';

@Component({
	selector: 'product-general-info-app',
	templateUrl: './product-general-info.component.html',
	styleUrls: ['./product-general-info.component.scss'],
})
export class ProductGeneralInfoComponent extends AutoUnsub implements OnInit {

	product$: Observable<Product>;
	product: Product;
	descriptor$: Observable<FormDescriptor>;
	descriptor2$: Observable<FormDescriptor>;

	@ViewChild(EditableTextComponent) editable: EditableTextComponent;
	@ViewChild('txt') textarea: ElementRef;


	// those are the custom fields for the first form section
	// ultimately "sections" should be added to the form descriptor so we only have one array of custom fields
	customFields: CustomField[] = [
		{ name: 'supplier', type: 'selector', metadata: { target: 'supplier', type: 'entity', labelName: 'name', canCreate: true } },
		{
			name: 'category', type: 'selector',
			metadata: { target: 'category', type: 'entity', labelName: 'name', canCreate: true }
		},
		{ name: 'name', type: 'text', required: true, label: 'name' },
		{ name: 'price', type: 'price' },
		// { name: 'createdBy', type: 'selector', metadata: { target: 'user', type: 'entity', labelName: 'name' } },
		{
			name: 'createdBy', label: 'Assignee', type: 'selector',
			metadata: { target: 'user', type: 'entity', labelName: 'name' }
		},
		{ name: 'minimumOrderQuantity', type: 'number', label: 'MOQ' },
		{ name: 'moqDescription', type: 'text', label: 'MOQ description' },
		{
			name: 'event', label: 'Found at', type: 'selector',
			metadata: { target: 'event', type: 'entity', labelName: 'name', canCreate: true }
		},
		{ name: 'tags', type: 'selector', metadata: { target: 'tag', type: 'entity', labelName: 'name', canCreate: true }, multiple: true },

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

	typeEntity = ERM.PRODUCT;
	contacts: Array<Contact>;

	constructor(
		private route: ActivatedRoute,
		private srv: ProductFeatureService,
		private dlgSrv: DialogService,
		private module: NgModuleRef<any>) {
		super();
	}

	ngOnInit() {
		this.product$ = this.route.parent.params.pipe(
			takeUntil(this._destroy$),
			switchMap(params => this.srv.selectOne(params.id)),
			tap(product => this.product = product)
		);
		// creating the form descriptor
		this.descriptor$ = this.product$.pipe(
			map(product => new FormDescriptor(this.customFields, product))
		);
		this.descriptor2$ = this.product$.pipe(
			map(product => new FormDescriptor(this.customFields2, product))
		);
		this.srv.getContacts(this.product.supplier.id).pipe(
			first()
		).subscribe(supp => this.contacts = supp.contacts);
	}

	/** when we receive back the form from the dynamic form component we subscribe to changes to it and
	 * update the product
	 */
	onFormCreated(form: FormGroup) {
		form.valueChanges
			.pipe(
				takeUntil(this._destroy$),
				distinctUntilChanged()
			)
			.subscribe(product => this.updateProduct(product));
	}

	updateProduct(product: Product) {
		product.id = this.product.id;
		this.srv.update(product).subscribe();
	}

	saveDescription(description: string) {
		this.updateProduct({ description });
	}

	cancel() {
		this.editable.close();
		this.textarea.nativeElement.value = this.product.description;
	}

	openRfq() {
		// we add manually the supplier self email, since it is not on the contacts
		if (this.contacts && this.product.supplier.officeEmail) {
			this.contacts.push({ name: this.product.supplier.name || 'Unnamed', email: this.product.supplier.officeEmail, jobTitle: null });
		} else if (!this.contacts && this.product.supplier.officeEmail) {
			this.contacts = [{ name: this.product.supplier.name || 'Unnamed', email: this.product.supplier.officeEmail, jobTitle: null }];
		}
		this.dlgSrv.openFromModule(RfqDialogComponent, this.module, { product: this.product, contacts: this.contacts });
	}

}
