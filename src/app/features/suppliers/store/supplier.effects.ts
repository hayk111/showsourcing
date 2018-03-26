import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError, distinctUntilChanged, mergeMap, tap } from 'rxjs/operators';
import { supplierActionTypes as ActionType, supplierActions } from './supplier.action';
import { SupplierService } from '~suppliers/services';
import { Supplier } from '~suppliers/models';
import { of } from 'rxjs/observable/of';
import { Swap } from '~app/shared/entity/utils';
import { imageActions, fileActions } from '~app/features/file';
import { commentActions } from '~app/features/comment';
import { ERM, EntityService, EntityTarget } from '~app/shared/entity';
import { TargetAction } from '~app/app-root/store/action/target/target.action';
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/observable/concat';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { appErrorActions } from '~app/shared/error-handler';
import { taskActions } from '~app/app-root/store/action';
import { productActions } from '~app/features/products/store';

@Injectable()
export class SuppliersEffects {
	@Effect()
	select$ = this.action$
		.ofType<any>(ActionType.SELECT)
		.pipe(
			distinctUntilChanged(),
			map(action => action.payload),
			map(id => ({ entityId: id, entityRepr: ERM.suppliers })),
			mergeMap((target: EntityTarget) => [
				TargetAction.select(target),
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

	constructor(private action$: Actions, private srv: SupplierService, private entitySrv: EntityService) { }
}

