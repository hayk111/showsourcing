import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	NgModuleRef,
	OnInit,
	ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { RfqDialogComponent } from '~features/products/components/rfq-dialog/rfq-dialog.component';
import { ProductFeatureService } from '~features/products/services';
import { ERM, Product } from '~models';
import { DialogService } from '~shared/dialog';
import { CustomField, FormDescriptor } from '~shared/dynamic-forms';
import { EditableTextComponent } from '~shared/editable-field';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'product-general-info-app',
	templateUrl: './product-general-info.component.html',
	styleUrls: ['./product-general-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGeneralInfoComponent extends AutoUnsub implements OnInit {
	// whether the form is open
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
			name: 'assignee', label: 'Assignee', type: 'selector',
			metadata: { target: 'user', type: 'entity', labelName: 'name' }
		},
		{ name: 'minimumOrderQuantity', type: 'number', label: 'MOQ' },
		{ name: 'moqDescription', type: 'text', label: 'MOQ description' },
		// {
		// 	name: 'event', label: 'Found at', type: 'selector',
		// 	metadata: { target: 'event', type: 'entity', labelName: 'name', canCreate: true }
		// },
		{ name: 'tags', type: 'selector', metadata: { target: 'tag', type: 'entity', labelName: 'name', canCreate: true }, multiple: true },

	];
	// those are the custom field for the second form section
	customFields2: CustomField[] = [
		{ name: 'innerCarton', type: 'packaging', label: 'inner carton' },
		{ name: 'masterCarton', type: 'packaging', label: 'master carton' },
		// { name: 'samplePrice', type: 'number', label: 'Sample Price' },
		{ name: 'priceMatrix', type: 'priceMatrix', label: 'price matrix' },
		{ name: 'sample', type: 'yesNo' },
		{ name: 'samplePrice', type: 'price', label: 'Sample Price' },
	];

	typeEntity = ERM.PRODUCT;

	constructor(
		private route: ActivatedRoute,
		private srv: ProductFeatureService,
		private dlgSrv: DialogService,
		private module: NgModuleRef<any>,
		private cd: ChangeDetectorRef
	) {
		super();
	}

	ngOnInit() {
		this.product$ = this.route.parent.params.pipe(
			takeUntil(this._destroy$),
			switchMap(params => this.srv.selectOne(params.id)),
			tap(product => this.product = product),
			// need to notify the component things have changed because of onpush and this is container
			// better to do it this way than to not use on push as this will prevent viewChangedAfterItWasCheckedError
			tap(_ => this.cd.markForCheck())
		);
		// creating the form descriptor
		this.descriptor$ = this.product$.pipe(
			map(product => new FormDescriptor(this.customFields, product))
		);
		this.descriptor2$ = this.product$.pipe(
			map(product => new FormDescriptor(this.customFields2, product))
		);
	}

	updateProduct(product: Product, fields?: string) {
		product.id = this.product.id;
		this.srv.update(product).subscribe();
	}

	updateProductProp(isCancel: boolean, value: any, prop: string) {
		if (!isCancel) {
			this.updateProduct({ [prop]: value }, prop);
		}
	}

	openRfq() {
		// we add manually the supplier self email, since it is not on the contacts
		this.dlgSrv.openFromModule(RfqDialogComponent, this.module, { product: this.product });
	}

	get priceAmount() {
		return (this.product && this.product.price) ? (this.product.price.value / 10000) : '-';
	}

}
