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
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Product } from '../../../../store/model/entities/product.model';
import { filter } from 'rxjs/operators/filter';
import { HttpClient } from '@angular/common/http';
import { DynamicFormsService } from '../../../../shared/dynamic-forms/services/dynamic-forms.service';
import Log from '../../../../../utils/logger/log.class';
import { ChangeDetectionStrategy } from '@angular/core';

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
		.pipe(
			takeUntil(this._destroy$),
			filter((dlgInfo: any) =>  dlgInfo.metadata),
			map((dlgInfo: any) => dlgInfo.metadata.id)
		);
	}


}
