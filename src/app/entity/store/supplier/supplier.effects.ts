import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError, distinctUntilChanged, mergeMap, tap } from 'rxjs/operators';
import { supplierActionTypes as ActionType, supplierActions } from './supplier.action';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/observable/concat';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { appErrorActions } from '~app/shared/error-handler';
import { ERM } from '~app/entity/store/entity.model';
import { EntityTarget } from '~app/entity/store/entity.model';
import { focussedEntityAction } from '../focussed-entity';
import { commentActions } from '../comment';
import { fileActions } from '../file';
import { imageActions } from '../image';
import { taskActions } from '../task';
import { productActions } from '../product';
import { Supplier } from './supplier.model';
import { Swap, EntityService } from '~app/entity';
import { SupplierHttpService } from '~app/entity/store/supplier/supplier-http.service';

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

