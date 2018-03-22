import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError, distinctUntilChanged, mergeMap, tap } from 'rxjs/operators';
import { SupplierActionType as ActionType, SupplierActions } from './supplier.action';
import { SupplierService } from '~suppliers/services';
import { Supplier } from '~suppliers/models';
import { of } from 'rxjs/observable/of';
import { AppErrorActions } from '~store/action/misc/app-errors.action';
import { Swap } from '~app/shared/entity/utils';
import { ImageActions, FileActions } from '~app/features/file';
import { CommentActions } from '~app/features/comment';
import { ERM } from '~app/shared/entity';
import { TargetAction } from '~app/app-root/store/action/target/target.action';
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/observable/concat';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class SuppliersEffects {
	@Effect()
	select$ = this.action$
		.ofType<any>(ActionType.SELECT)
		.pipe(
			distinctUntilChanged(),
			map(action => action.payload),
			map(id => ({ entityId: id, entityRepr: ERM.suppliers })),
			mergeMap(target => [
				TargetAction.select(target),
				CommentActions.load(),
				FileActions.load(),
				ImageActions.load(),
			])
		);

	@Effect()
	load$ = this.action$
		.ofType<any>(ActionType.LOAD)
		.pipe(switchMap(_ => this.srv.load()), map((result: any) => SupplierActions.add(result)));

	@Effect()
	loadById$ = this.action$
		.ofType<any>(ActionType.LOAD_BY_ID)
		.pipe(
			map(action => action.payload),
			switchMap((id: any) => this.srv.loadById(id)),
			map((result: Supplier) => SupplierActions.add([result]))
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
						map((r: any) => SupplierActions.replace([new Swap(supplier, r)]), catchError(e => of(AppErrorActions.add(e))))
					)
			)
		);

	@Effect({ dispatch: false })
	patch$ = this.action$
		.ofType<any>(ActionType.PATCH)
		.pipe(map(action => action.payload), switchMap((p: any) => this.srv.sendPatchRequest(p)));

	@Effect({ dispatch: false })
	delete$ = this.action$
		.ofType<any>(ActionType.DELETE)
		.pipe(
			map(action => action.payload),
			switchMap((ids: Array<string>) => forkJoin(ids.map(supplierId => this.srv.delete(supplierId))))
		);

	@Effect()
	loadProductCount$ = this.action$
		.ofType<any>(ActionType.LOAD_PRODUCT_COUNT)
		.pipe(switchMap(_ => this.srv.loadProductCount()), map((r: any) => SupplierActions.addProductCount(r)));

	constructor(private action$: Actions, private srv: SupplierService) {}
}
