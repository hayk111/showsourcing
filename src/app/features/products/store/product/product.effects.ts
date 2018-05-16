import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable ,  forkJoin } from 'rxjs';
import { distinctUntilChanged, map, mergeMap, startWith, switchMap, tap } from 'rxjs/operators';

import { actionTypes, productActions } from './product.action';
import { ProductHttpService } from './product-http.service';
import { ERM, EntityTarget } from '~app/entity/store/entity.model';
import { fromFile } from '~app/entity/store/file/file.bundle';
import { imageActions } from '~app/entity/store/image/image.action';
import { fromTask } from '~app/entity/store/task/task.bundle';
import { fromProject } from '~app/entity/store/project/project.bundle';
import { selectUser } from '~user';
import { EntityService } from '~app/entity/store/entity.service';
import { Product } from './product.model';
import { DialogActions } from '~app/shared/dialog/store/dialog.action';
import { DialogName } from '~app/shared/dialog';
import { Router } from '@angular/router';
import { fromTag } from '~app/entity/store/tag/tag.bundle';
import { CommentActions } from '~app/features/comment/store/comment';
import { FocusedEntityService } from '~app/shared/focused-entity/focused-entity.service';


@Injectable()
export class ProductEffects {
	userID: string;

	// when a product is put at the foreground eg product/details
	@Effect()
	focus$ = this.actions$
		.ofType<any>(actionTypes.FOCUS)
		.pipe(
			distinctUntilChanged(),
			map(action => action.payload),
			map(id => ({ entityId: id, entityRepr: ERM.product })),
			tap((target: EntityTarget) => this.focusSrv.target = target),
			mergeMap(target => [
				productActions.loadById(target.entityId),
				CommentActions.load(),
				fromFile.Actions.loadForSelection(),
				imageActions.loadForSelection(),
				fromTask.Actions.loadForSelection(),
			])
		);

	@Effect()
	load$ = this.actions$.ofType<any>(actionTypes.LOAD).pipe(
		map(action => action.payload),
		switchMap((params: any) => {
			// get products
			return this.srv.load(params).pipe(
				// add products
				mergeMap((r: any) => [
					productActions.set(r),
					// set product tag
					// set product project
				])
			);
		})
	);

	@Effect()
	loadMore$ = this.actions$.ofType<any>(actionTypes.LOAD_MORE).pipe(
		map(action => action.payload),
		switchMap((params: any) => {
			// get products
			return this.srv.load(params).pipe(
				// add products
				mergeMap((r: any) => [
					productActions.add(r)
					// add product tag
					// add product project
				])
			);
		})
	);

	@Effect()
	loadById$ = this.actions$
		.ofType<any>(actionTypes.LOAD_BY_ID)
		.pipe(
			map(action => action.payload),
			switchMap((id: string) => this.srv.loadById(id)),
			map((r: any) => productActions.add(r))
		);

	@Effect()
	create$ = this.actions$.ofType<any>(actionTypes.CREATE).pipe(
		map(action => action.payload),
		switchMap((product: Product) => this.srv.create(product)),
		tap((product: Product) => this.router.navigate(['product', 'details', product.id])),
		mergeMap((product: Product) => [
			productActions.replace([product]),
			DialogActions.close(DialogName.NEW_PRODUCT)
		])
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

	// for feedback
	@Effect()
	requestFeedback$ = this.actions$.ofType<any>(actionTypes.REQUEST_FEEDBACK).pipe(
		map(action => action.payload),
		switchMap(({ productsIds, recipientsIds }) => {
			return productsIds.map(productId => {
				this.srv.requestFeedback(productId, recipientsIds);
			});
		}),
		map((result: any) => productActions.requestFeedbackSuccess(result))
	);

	@Effect()
	downloadPdf$ = this.actions$
		.ofType<any>(actionTypes.REQUEST_PDF)
		.pipe(
			map(action => action.payload),
			switchMap(id => this.srv.sendPdfReq(id)),
			map((path: string) => fromFile.Actions.download(path))
		);

	@Effect({ dispatch: false })
	patch$ = this.actions$
		.ofType<any>(actionTypes.PATCH)
		.pipe(map(action => action.payload), switchMap((p: any) => this.entitySrv.patch(p, ERM.product)));

	// tag adding / removing / creating
	@Effect({ dispatch: false })
	addTag$ = this.actions$
		.ofType<any>(actionTypes.ADD_TAG)
		.pipe(map(action => action.payload), switchMap(payload => this.srv.addTag(payload)));

	@Effect({ dispatch: false })
	removeTag$ = this.actions$
		.ofType<any>(actionTypes.REMOVE_TAG)
		.pipe(map(action => action.payload), switchMap(payload => this.srv.removeTag(payload)));

	// creates a tag and add it to the product
	@Effect()
	createTag$ = this.actions$
		.ofType<any>(actionTypes.CREATE_TAG)
		.pipe(
			map(action => action.payload),
			switchMap(payload =>
				this.srv
					.createTag(payload)
					.pipe(mergeMap((r: any) => [productActions.addTag(r, payload.productId), fromTag.Actions.add([r])]))
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

	// creates a project and add it to the product
	@Effect()
	createProject$ = this.actions$
		.ofType<any>(actionTypes.CREATE_PROJECT)
		.pipe(
			map(action => action.payload),
			switchMap(payload =>
				this.srv
					.createProject(payload)
					.pipe(mergeMap((r: any) => [(productActions.addProject(r, payload.productId), fromProject.Actions.add([r]))]))
			)
		);


	constructor(
		private srv: ProductHttpService,
		private actions$: Actions,
		private entitySrv: EntityService,
		private router: Router,
		private focusSrv: FocusedEntityService
	) {

	}
}
