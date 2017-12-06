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
import { distinctUntilChanged } from 'rxjs/operators';
import Log from '../../../../../utils/logger/log.class';
import { entityRepresentationMap } from '../../../../store/model/filter.model';

@Component({
	selector: 'product-dialog-app',
	templateUrl: './product-dialog.component.html',
	styleUrls: ['./product-dialog.component.scss'],
})
export class ProductDialogComponent extends AutoUnsub implements OnInit {
	dlgName = DialogName.PRODUCT;
	entityRepr = entityRepresentationMap.product;
	product;
	formDescriptor$;
	product$: Observable<Product>;
	groups$: Observable<Array<DynamicFormGroup>>;
	groups: Array<DynamicFormGroup>;
	itemId$: Observable<string>;

	constructor(private store: Store<any>,
							private dynamicFormsSrv: DynamicFormsService,
							private http: HttpClient) {
		super();
	}

	ngOnInit() {
		this.groups$ = of(customFieldsMock)
			.map(desc => [
					this.dynamicFormsSrv.toDynamicFormGroup(desc.groups[0]),
					this.dynamicFormsSrv.toDynamicFormGroup(desc.groups[1]),
					this.dynamicFormsSrv.toDynamicFormGroup(desc.groups[2]),
					this.dynamicFormsSrv.toDynamicFormGroup(desc.groups[3])
				]);
		this.groups$.takeUntil(this._destroy$).subscribe(gs => this.groups = gs);

	}

	onVote(value) {
		this.store.dispatch(ProductActions.voteProduct(this.product.id, value));
	}

	onRequest() {
		Log.debug('request requested');
	}

	onNewComment(txt: string) {

	}

	onUpdate( { name, value} ) {
		this.store.dispatch(ProductActions.patch(this.product.id, name, value));
	}

	onImgAdded(img) {
		this.store.dispatch(ProductActions.addPendingImage(this.product.id, img));
	}

	onImgUploaded(img) {
		this.http.post(`api/product/${this.product.id}/image`,
				{ imageId: img.info.id, itemId: this.product.id, mainImage: false })
			.subscribe(x => this.store.dispatch(ProductActions.setImageReady(this.product.id, img)));
	}

	onDlgRegistered() {
		// when we receive dlg metadata, we get the correct product
		this.itemId$ = this.store.select(selectDialog(DialogName.PRODUCT))
			.pipe(
				filter((dlgInfo: any) =>  dlgInfo.metadata),
				map((dlgInfo: any) => dlgInfo.metadata.id)
			);
		this.itemId$.takeUntil(this._destroy$);
		this.product$ = this.itemId$.pipe(
			switchMap((id) => this.store.select<any>(selectProductById(id)))
			);
		this.product$
			.takeUntil(this._destroy$).subscribe((product) => {
				if (!product.deeplyLoaded)
					this.store.dispatch(ProductActions.deepLoad(product.id));
				this.product = product;
			});
	}
}

const customFieldsMock = {
	groups: [
		{
			name: 'Group 0',
			fields: [
				{ name: 'images', label: 'images', fieldType: 'image'}
			]
		},
		{
			name: 'Group 1',
			'fields': [
				{'name': 'supplierId', 'label': 'supplier', 'fieldType': 'entitySelect', metadata: { entity: 'suppliers' }},
				{'name': 'categoryId', 'label': 'category', 'fieldType': 'entitySelect', metadata: { entity: 'categories' }},
				{'name': 'status', 'label': 'status', 'fieldType': 'entitySelect', metadata: { entity: 'productStatus' }},
				{'name': 'eventId', 'label': 'event', 'fieldType': 'entitySelect', metadata: { entity: 'events' }},
			]
		},
		{
			name: 'Group 2',
			fields: [
				{'name': 'name', 'label': 'name', 'fieldType': 'standard'},
				{'name': 'rating', 'label': 'rating', 'fieldType': 'rating'},
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
