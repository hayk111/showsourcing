import { Component, OnInit, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { dotSelector } from '../../../../store/selectors/dot-selector';
import { FormBuilderService } from '../../../../shared/form-builder/services/form-builder.service';
import { FormGroupDescriptor } from '../../../../shared/form-builder/interfaces/form-group-descriptor.interface';
import { FormDescriptor } from '../../../../shared/form-builder/interfaces/form-descriptor.interface';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { EntityState, EntityTarget } from '../../../../store/utils/entities.utils';
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
import { of } from 'rxjs/observable/of';
import { DynamicFormsService } from '../../../../shared/dynamic-forms/services/dynamic-forms.service';
import { DynamicFormGroup } from '../../../../shared/dynamic-forms/utils/dynamic-controls.class';
import { ProductActions } from '../../../../store/action/product.action';
import { distinctUntilChanged } from 'rxjs/operators';
import Log from '../../../../../utils/logger/log.class';
import { entityRepresentationMap } from '../../../../store/model/filter.model';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { CommentActions } from '../../../../store/action/comment.action';
import { FileActions } from '../../../../store/action/app-file.action';

@Component({
	selector: 'product-dialog-app',
	templateUrl: './product-dialog.component.html',
	styleUrls: ['./product-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDialogComponent extends AutoUnsub implements OnInit, AfterViewInit {
	dlgName = DialogName.PRODUCT;
	entityRepr = entityRepresentationMap.product;
	target: EntityTarget;
	product$: Observable<Product>;
	itemId$: Observable<string>;
	productId: string;

	constructor(private store: Store<any>,
							private dynamicFormsSrv: DynamicFormsService,
							private http: HttpClient) {
		super();
	}

	ngOnInit() {
	}

	onVote(value) {
		this.store.dispatch(ProductActions.voteProduct(this.productId, value));
	}

	onRequest() {
		Log.debug('request requested');
	}

	onNewComment(text: string) {
		this.store.dispatch(ProductActions.comment(this.productId, text));
	}

	onUpdate( { name, value} ) {
		this.store.dispatch(ProductActions.patch(this.productId, name, value));
	}
	// 2
	onImgsAdded(imgs) {
		this.store.dispatch(ProductActions.addImages(this.productId, imgs));
	}

	onImgAdded(img) {
		// this.store.dispatch(ProductActions.addPendingImage(this.productId, img));
	}

	onImgUploaded(img) {
		this.http.post(`api/product/${this.productId}/image`,
				{ imageId: img.info.id, itemId: this.productId, mainImage: false })
			.subscribe(x => this.store.dispatch(ProductActions.setImageReady(this.productId, img)));
	}

	onDlgRegistered() {
		// when we receive dlg metadata, we get the correct product
		this.itemId$ = this.selectProductId();
		// select correct product
		this.product$ = this.itemId$.pipe(
			switchMap((id) => this.store.select<any>(selectProductById(id)))
			);
		// deeps loads product
		this.product$
			.takeUntil(this._destroy$).subscribe((product) => {
				this.target = { entityId: product.id, entityRepr: this.entityRepr };
				this.store.dispatch(CommentActions.load(this.target));
				this.store.dispatch(FileActions.load(this.target));
				this.productId = product.id;
			});
	}

	private selectProductId() {
		return this.store.select(selectDialog(DialogName.PRODUCT))
		.takeUntil(this._destroy$)
		.pipe(
			filter((dlgInfo: any) =>  dlgInfo.metadata),
			map((dlgInfo: any) => dlgInfo.metadata.id)
		);
	}

	ngAfterViewInit() {

	}

}
