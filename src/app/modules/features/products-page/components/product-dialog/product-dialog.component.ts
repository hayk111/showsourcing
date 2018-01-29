import { Component, OnInit, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { EntityState, EntityTarget, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { Supplier } from '../../../../store/model/entities/supplier.model';
import { DialogName } from '../../../../store/model/ui/dialog.model';
import { selectDialog } from '../../../../store/selectors/ui/dialog.selector';
import { selectProductById } from '../../../../store/selectors/entities/products.selector';
import { map, switchMap, merge } from 'rxjs/operators';
import { Product } from '../../../../store/model/entities/product.model';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { Subject } from 'rxjs/Subject';
import { zip } from 'rxjs/observable/zip';
import { filter } from 'rxjs/operators/filter';
import { takeUntil } from 'rxjs/operator/takeUntil';
import { HttpClient } from '@angular/common/http';
import { selectCustomField } from '../../../../store/selectors/entities/custom-fields.selector';
import { CustomFieldsName } from '../../../../store/reducer/entities/custom-fields.reducer';
import { of } from 'rxjs/observable/of';
import { DynamicFormsService } from '../../../../shared/dynamic-forms/services/dynamic-forms.service';
import { DynamicFormGroup } from '../../../../shared/dynamic-forms/utils/dynamic-controls.class';
import { ProductActions } from '../../../../store/action/entities/product.action';
import { distinctUntilChanged } from 'rxjs/operators';
import Log from '../../../../../utils/logger/log.class';
import { AfterViewInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { CommentActions } from '../../../../store/action/entities/comment.action';
import { FileActions } from '../../../../store/action/entities/file.action';

@Component({
	selector: 'product-dialog-app',
	templateUrl: './product-dialog.component.html',
	styleUrls: ['./product-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDialogComponent extends AutoUnsub implements OnInit {
	dlgName = DialogName.PRODUCT;
	entityRepr = entityRepresentationMap.product;
	target$: Observable<EntityTarget>;
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

	onRequest() {
		Log.debug('request requested');
	}

	onDlgRegistered() {
		// when we receive dlg metadata, we get the correct product
		this.itemId$ = this.selectProductId();
		this.target$ = this.itemId$.map(id => ({ entityId: id, entityRepr: this.entityRepr }));
		// select correct product
		this.product$ = this.itemId$.pipe(
			switchMap((id) => this.store.select<any>(selectProductById(id)))
		);
	}

	private selectProductId() {
		return this.store.select(selectDialog(DialogName.PRODUCT))
		.takeUntil(this._destroy$)
		.pipe(
			filter((dlgInfo: any) =>  dlgInfo.metadata),
			map((dlgInfo: any) => dlgInfo.metadata.id)
		);
	}


}
