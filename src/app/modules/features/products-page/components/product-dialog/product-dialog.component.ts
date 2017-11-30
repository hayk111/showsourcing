import { Component, OnInit, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { dotSelector } from '../../../../store/selectors/dot-selector';
import { FormBuilderService } from '../../../../shared/form-builder/services/form-builder.service';
import { FormGroupDescriptor } from '../../../../shared/form-builder/interfaces/form-group-descriptor.interface';
import { FormDescriptor } from '../../../../shared/form-builder/interfaces/form-descriptor.interface';
import { Observable } from 'rxjs/Observable';
import { FileUploader, FileItem, ParsedResponseHeaders, FileUploaderOptions } from 'ng2-file-upload';
import { FormGroup } from '@angular/forms/src/model';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { EntityState } from '../../../../store/utils/entities.utils';
import { Supplier } from '../../../../store/model/supplier.model';
import { DialogName } from '../../../../store/model/dialog.model';
import { selectDialog } from '../../../../store/selectors/dialog.selector';
import { selectProductById } from '../../../../store/selectors/products.selector';
import { map, switchMap, merge } from 'rxjs/operators';
import { Product } from '../../../../store/model/product.model';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { Subject } from 'rxjs/Subject';
import { zip } from 'rxjs/observable/zip';
import { filter } from 'rxjs/operators/filter';
import { takeUntil } from 'rxjs/operator/takeUntil';
import { HttpClient } from '@angular/common/http';
import { selectCustomField } from '../../../../store/selectors/custom-fields.selector';
import { CustomFieldsName } from '../../../../store/reducer/custom-fields.reducer';
import { FileUploaderService } from '../../../../shared/uploader/services/file-uploader.service';
import { of } from 'rxjs/observable/of';
import { DynamicFormsService } from '../../../../shared/dynamic-forms/services/dynamic-forms.service';
import { DynamicFormGroup } from '../../../../shared/dynamic-forms/utils/dynamic-controls.class';
import { ProductActions } from '../../../../store/action/product.action';

@Component({
	selector: 'product-dialog-app',
	templateUrl: './product-dialog.component.html',
	styleUrls: ['./product-dialog.component.scss'],
	providers: [ FileUploaderService ]
})
export class ProductDialogComponent extends AutoUnsub implements OnInit {
	dlgName = DialogName.PRODUCT;
	product;
	formDescriptor$;
	isOver = false;
	product$: Observable<EntityState<Product>>;
	groups$: Observable<Array<DynamicFormGroup>>;

	constructor(private store: Store<any>,
							private dynamicFormsSrv: DynamicFormsService,
							private http: HttpClient,
							public uploader: FileUploaderService) {
		super();
	}

	ngOnInit() {
		// this.formDescriptor$ = this.store.select(selectCustomField(CustomFieldsName.PRODUCTS))
		// .filter( r => r);
		this.groups$ = of(customFieldsMock)
			.map(desc => [
					this.dynamicFormsSrv.toDynamicFormGroup(desc.groups[0]),
					this.dynamicFormsSrv.toDynamicFormGroup(desc.groups[1]),
					this.dynamicFormsSrv.toDynamicFormGroup(desc.groups[2])
				]);
	}

	onEnter( { name, value} ) {
		this.store.dispatch(ProductActions.patch(this.product.id, name, value));
	}

	onDlgRegistered() {
		// when we receive dlg metadata, we get the correct product
		this.product$ = this.store.select(selectDialog(DialogName.PRODUCT))
			.pipe(
				filter((dlgInfo: any) =>  dlgInfo.metadata),
				map((dlgInfo: any) => dlgInfo.metadata.id),
				switchMap(id => this.store.select<any>(selectProductById(id)))
			);
		this.product$.subscribe(product => this.product = product) ;
	}

	fileOverBase(e: any): void {
		this.isOver = e;
	}

}

const customFieldsMock = {
	groups: [
		{
			name: 'Group 1',
			'fields': [
				{'name': 'supplierId', 'label': 'supplier', 'fieldType': 'standard'},
				{'name': 'categoryId', 'label': 'category', 'fieldType': 'standard'},
				{'name': 'status', 'label': 'status', 'fieldType': 'standard'},
				{'name': 'eventId', 'label': 'event', 'fieldType': 'standard'},
			]
		},
		{
			name: 'Group 2',
			fields: [
				{'name': 'name', 'label': 'name', 'fieldType': 'standard'},
				{'name': 'rating', 'label': 'rating', 'fieldType': 'standard'},
				{'name': 'priceAmount', 'label': 'priceAmount', 'fieldType': 'standard'},
				{'name': 'priceCurrency', 'label': 'priceCurrency', 'fieldType': 'standard'},
			]
		},
		{
			name: 'Group 3',
			fields: [
				{'name': 'minimumOrderQuantity', 'label': 'minimumOrderQuantity', 'fieldType': 'standard'},
				{'name': 'description', 'label': 'description', 'fieldType': 'standard'},
				{'name': 'tags', 'label': 'tags', 'fieldType': 'standard'},
				{'name': 'projects', 'label': 'projects', 'fieldType': 'standard'}
			]
		}
	]
};
