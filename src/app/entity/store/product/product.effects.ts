import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { distinctUntilChanged, map, mergeMap, startWith, switchMap } from 'rxjs/operators';
import { tagActions } from '../tag';

import { actionTypes, productActions } from './product.action';
import { ProductHttpService } from '~app/entity/store/product/product-http.service';
import { ERM } from '~app/entity/store/entity.model';
import { focussedEntityAction } from '~entity/store/focussed-entity';
import { commentActions } from '~entity/store/comment';
import { fileActions } from '~entity/store/file';
import { imageActions } from '~entity/store/image';
import { taskActions } from '~entity/store/task';
import { projectActions } from '~entity/store/project';
import { selectUser } from '~user';
import { EntityService } from '~app/entity/store/entity.service';


@Injectable()
export class ProductEffects {
	userID: string;

	@Effect()
	focus$ = this.actions$
		.ofType<any>(actionTypes.FOCUS)
		.pipe(
			distinctUntilChanged(),
			map(action => action.payload),
			map(id => ({ entityId: id, entityRepr: ERM.product })),
			mergeMap(target => [
				focussedEntityAction.focus(target),
				productActions.loadById(target.entityId),
				commentActions.loadForSelection(),
				fileActions.loadForSelection(),
				imageActions.loadForSelection(),
				taskActions.loadForSelection(),
			])
		);

	@Effect()
	load$ = this.actions$.ofType<any>(actionTypes.LOAD).pipe(
		map(action => action.payload),
		switchMap((params: any) => {
			// get products
			return this.srv.load(params).pipe(
				// add products
				map((r: any) => productActions.add(r))
			);
		})
	);

	@Effect({ dispatch: false })
	delete$ = this.actions$
		.ofType<any>(actionTypes.DELETE)
		.pipe(
			map(action => action.payload),
			switchMap((ids: Array<string>) =>
				forkJoin(ids.map(id => this.entitySrv.delete({ targetId: id, target: ERM.product })))
			)
		);

	@Effect({ dispatch: false })
	vote$ = this.actions$.ofType<any>(actionTypes.VOTE).pipe(
		map(action => action.payload),
		switchMap(({ id, value }) => {
			return this.srv.vote(id, value);
		})
	);

	// for pagination
	@Effect()
	loadMore$ = this.actions$
		.ofType<any>(actionTypes.LOAD_MORE)
		.pipe(
			map(action => action.payload),
			switchMap((params: any) => this.srv.load(params)),
			map((r: any) => productActions.add(r))
		);

	@Effect()
	loadById$ = this.actions$
		.ofType<any>(actionTypes.LOAD_BY_ID)
		.pipe(
			map(action => action.payload),
			switchMap((id: string) => this.srv.loadById(id)),
			map((r: any) => productActions.add(r))
		);

	// for feedback
	@Effect()
	requestFeedback$ = this.actions$.ofType<any>(actionTypes.REQUEST_FEEDBACK).pipe(
		map(action => action.payload),
		switchMap(({ productsIds, recipientsIds }) => {
			const obs$ = new Array<Observable<any>>();
			productsIds.forEach(projectid => {
				obs$.push(this.srv.requestFeedback(projectid, recipientsIds));
			});
			const result = forkJoin(obs$);
			return result;
		}),
		map((result: any) => productActions.requestFeedbackSuccess(result))
	);

	@Effect()
	downloadPdf$ = this.actions$
		.ofType<any>(actionTypes.REQUEST_PDF)
		.pipe(
			map(action => action.payload),
			switchMap(id => this.srv.sendPdfReq(id)),
			map((path: string) => fileActions.download(path))
		);

	@Effect({ dispatch: false })
	patch$ = this.actions$
		.ofType<any>(actionTypes.PATCH)
		.pipe(map(action => action.payload), switchMap((p: any) => this.entitySrv.patch(p, ERM.product)));

	// tags adding / removing / creating
	@Effect({ dispatch: false })
	addTag$ = this.actions$
		.ofType<any>(actionTypes.ADD_TAG)
		.pipe(map(action => action.payload), switchMap(payload => this.srv.addTag(payload)));

	@Effect({ dispatch: false })
	removeTag$ = this.actions$
		.ofType<any>(actionTypes.REMOVE_TAG)
		.pipe(map(action => action.payload), switchMap(payload => this.srv.removeTag(payload)));

	@Effect()
	createTag$ = this.actions$
		.ofType<any>(actionTypes.CREATE_TAG)
		.pipe(
			map(action => action.payload),
			switchMap(payload =>
				this.srv
					.createTag(payload)
					.pipe(mergeMap((r: any) => [productActions.addTag(r, payload.productId), tagActions.add([r])]))
			)
		);

	// projects adding / removing / creating
	@Effect({ dispatch: false })
	addProject$ = this.actions$
		.ofType<any>(actionTypes.ADD_PROJECT)
		.pipe(map(action => action.payload), switchMap(payload => this.srv.addProject(payload)));

	@Effect({ dispatch: false })
	removeProject$ = this.actions$
		.ofType<any>(actionTypes.REMOVE_PROJECT)
		.pipe(map(action => action.payload), switchMap(payload => this.srv.removeProject(payload)));

	@Effect()
	createProject$ = this.actions$
		.ofType<any>(actionTypes.CREATE_PROJECT)
		.pipe(
			map(action => action.payload),
			switchMap(payload =>
				this.srv
					.createProject(payload)
					.pipe(mergeMap((r: any) => [(productActions.addProject(r, payload.productId), projectActions.add([r]))]))
			)
		);

	@Effect()
	loadLatestForTarget$ = this.actions$
		.ofType<any>(actionTypes.LOAD_LATEST_FOR_TARGET)
		.pipe(
			map(action => action.payload),
			switchMap(supplierId => this.srv.loadLatestForTarget(supplierId).pipe(startWith(productActions.reset()))),
			map((r: any) => productActions.set(r))
		);

	constructor(
		private srv: ProductHttpService,
		private actions$: Actions,
		private store: Store<any>,
		private entitySrv: EntityService
	) {
		this.store
			.select(selectUser)
			.pipe(map(user => user.id))
			.subscribe(id => (this.userID = id));
	}
}
