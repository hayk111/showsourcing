import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { catchError, distinctUntilChanged, map, mergeMap, switchMap } from 'rxjs/operators';
import { EntityTarget, ERM } from '~app/entity/store/entity.model';
import { SupplierHttpService } from '~app/entity/store/supplier/supplier-http.service';
import { appErrorActions } from '~app/shared/error-handler';
import { EntityService } from '~entity/store/entity.service';
import { Swap } from '~entity/utils';

import { commentActions } from '../comment';
import { fileActions } from '../file';
import { focussedEntityAction } from '../focussed-entity';
import { imageActions } from '../image';
import { productActions } from '../product';
import { taskActions } from '../task';
import { supplierActions, supplierActionTypes as ActionType } from './supplier.action';
import { Supplier } from './supplier.model';

@Injectable()
export class SuppliersEffects {
	@Effect()
	focus$ = this.action$
		.ofType<any>(ActionType.FOCUS)
		.pipe(
			distinctUntilChanged(),
			map(action => action.payload),
			map(id => ({ entityId: id, entityRepr: ERM.suppliers })),
			mergeMap((target: EntityTarget) => [
				focussedEntityAction.focus(target),
				commentActions.loadForSelection(),
				fileActions.loadForSelection(),
				imageActions.loadForSelection(),
				taskActions.loadForSelection(),
				productActions.loadLatestForTarget(target)
			])
		);

	@Effect()
	load$ = this.action$
		.ofType<any>(ActionType.LOAD)
		.pipe(switchMap(_ => this.srv.load()), map((result: any) => supplierActions.add(result)));

	@Effect()
	loadById$ = this.action$
		.ofType<any>(ActionType.LOAD_BY_ID)
		.pipe(
			map(action => action.payload),
			switchMap((id: any) => this.srv.loadById(id)),
			map((result: Supplier) => supplierActions.add([result]))
		);

	@Effect()
	create$ = this.action$
		.ofType<any>(ActionType.CREATE)
		.pipe(
			map(action => action.payload),
			switchMap(supplier =>
				this.srv
					.create(supplier)
					.pipe(
						map((r: any) => supplierActions.replace([new Swap(supplier, r)]), catchError(e => of(appErrorActions.add(e))))
					)
			)
		);

	@Effect({ dispatch: false })
	patch$ = this.action$
		.ofType<any>(ActionType.PATCH)
		.pipe(map(action => action.payload), switchMap((p: any) => this.entitySrv.patch(p, ERM.suppliers)));

	@Effect({ dispatch: false })
	delete$ = this.action$
		.ofType<any>(ActionType.DELETE)
		.pipe(
			map(action => action.payload),
			switchMap((ids: Array<string>) =>
				forkJoin(ids.map(id => this.entitySrv.delete({ targetId: id, target: ERM.suppliers })))
			)
		);

	@Effect()
	loadProductCount$ = this.action$
		.ofType<any>(ActionType.LOAD_PRODUCT_COUNT)
		.pipe(switchMap(_ => this.srv.loadProductCount()), map((r: any) => supplierActions.addProductCount(r)));

	constructor(private action$: Actions, private srv: SupplierHttpService, private entitySrv: EntityService) { }
}

