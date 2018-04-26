import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { catchError, distinctUntilChanged, map, mergeMap, switchMap, tap, startWith } from 'rxjs/operators';
import { EntityTarget, ERM } from '~app/entity/store/entity.model';
import { SupplierHttpService } from '~app/entity/store/supplier/supplier-http.service';
import { appErrorActions } from '~app/shared/error-handler';
import { EntityService } from '~entity/store/entity.service';
import { Swap } from '~entity/utils';

import { fromComment } from '../comment';
import { fromFile } from '../file';
import { focussedEntityAction } from '../focussed-entity';
import { fromImage } from '../image';
import { productActions } from '../product';
import { fromTask } from '../task';
import { supplierActions, supplierActionTypes as ActionType } from './supplier.action';
import { Supplier } from './supplier.model';
import { fromTag } from '~app/entity/store/tag';
import { fromCategory } from '~app/entity/store/category';
import { notificationActions } from '~app/shared/notifications/store/notification.action';
import { NotificationType } from '~app/shared/notifications';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LatestProductActions, ContactActions } from '~app/features/supplier/store';

@Injectable()
export class SuppliersEffects {
	@Effect()
	focus$ = this.action$
		.ofType<any>(ActionType.FOCUS)
		.pipe(
			distinctUntilChanged(),
			map(action => action.payload),
			map(id => ({ entityId: id, entityRepr: ERM.supplier })),
			mergeMap((target: EntityTarget) => [
				focussedEntityAction.focus(target),
				fromComment.Actions.loadForSelection(),
				fromFile.Actions.loadForSelection(),
				fromImage.Actions.loadForSelection(),
				fromTask.Actions.loadForSelection(),
				LatestProductActions.load(),
				ContactActions.load()
			])
		);

	@Effect()
	load$ = this.action$
		.ofType<any>(ActionType.LOAD)
		.pipe(
			switchMap(_ => this.srv.loadAll()),
			map((result: any) => supplierActions.add(result))
		);

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
						mergeMap((newSupplier: any) => [
							supplierActions.replace([new Swap(supplier, newSupplier)]),
							notificationActions.add({ type: NotificationType.SUCCESS, title: 'Supplier Added', timeout: 2000 })
						]),
						catchError(e => of(appErrorActions.add(e)))
					)
			)
		);

	@Effect({ dispatch: false })
	patch$ = this.action$
		.ofType<any>(ActionType.PATCH)
		.pipe(map(action => action.payload), switchMap((p: any) => this.entitySrv.patch(p, ERM.supplier)));


	@Effect({ dispatch: false })
	delete$ = this.action$
		.ofType<any>(ActionType.DELETE)
		.pipe(
			map(action => action.payload),
			switchMap((ids: Array<string>) =>
				forkJoin(ids.map(id => this.entitySrv.delete({ targetId: id, target: ERM.supplier })))
			)
		);

	// loading product count for each entity
	@Effect()
	loadProductsCount$ = this.action$.ofType<any>(ActionType.LOAD_PRODUCT_COUNT).pipe(
		switchMap(_ => this.entitySrv.loadProductCount(ERM.supplier)),
		map((items: any) => supplierActions.setProductCount(items))
	);

	// tag adding / removing / creating
	@Effect({ dispatch: false })
	addTag$ = this.action$
		.ofType<any>(ActionType.ADD_TAG)
		.pipe(map(action => action.payload), switchMap(payload => this.srv.addTag(payload)));

	@Effect({ dispatch: false })
	removeTag$ = this.action$
		.ofType<any>(ActionType.REMOVE_TAG)
		.pipe(map(action => action.payload), switchMap(payload => this.srv.removeTag(payload)));

	@Effect()
	createTag$ = this.action$
		.ofType<any>(ActionType.CREATE_TAG)
		.pipe(
			map(action => action.payload),
			switchMap(payload =>
				this.srv
					.createTag(payload)
					.pipe(
						mergeMap((r: any) => [
							supplierActions.addTag(r, payload.supplierId),
							fromTag.Actions.add([r])
						])
					)
			)
		);

	// category adding / removing / creating
	@Effect({ dispatch: false })
	addCategory$ = this.action$
		.ofType<any>(ActionType.ADD_CATEGORY)
		.pipe(map(action => action.payload), switchMap(payload => this.srv.addCategory(payload)));

	@Effect({ dispatch: false })
	removeCategory$ = this.action$
		.ofType<any>(ActionType.REMOVE_CATEGORY)
		.pipe(map(action => action.payload), switchMap(payload => this.srv.removeCategory(payload)));

	@Effect()
	createCategory$ = this.action$
		.ofType<any>(ActionType.CREATE_CATEGORY)
		.pipe(
			map(action => action.payload),
			switchMap(payload =>
				this.srv
					.createCategory(payload)
					.pipe(mergeMap((r: any) => [supplierActions.addCategory(r, payload.supplierId), fromCategory.Actions.add([r])]))
			)
		);
	constructor(
		private action$: Actions,
		private srv: SupplierHttpService,
		private entitySrv: EntityService,
		private router: Router,
		private store: Store<any>) { }
}

