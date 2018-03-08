import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';
import { AppFile, FileActions } from '~features/file';
import { ProductService } from '~products/services/product.service';
import { selectUser } from '~user/store/selectors/user.selector';

import { ProductActions, ProductActionTypes } from './product.action';

@Injectable()
export class ProductEffects {
	userID: string;

	@Effect()
	load$ = this.actions$.ofType<any>(ProductActionTypes.LOAD).pipe(
		map(action => action.payload),
		switchMap((params: any) => {
			// get products
			return this.srv.load(params).pipe(
				// set products
				map((r: any) => ProductActions.set(r))
			);
		})
	);

	@Effect({ dispatch: false })
	delete$ = this.actions$.ofType<any>(ProductActionTypes.DELETE).pipe(
		map(action => action.payload),
		switchMap((ids: Array<string>) => {
			const obs$ = new Array<Observable<any>>();
			ids.forEach(projectid => {
				obs$.push(this.srv.delete(projectid));
			});
			const result = Observable.forkJoin(obs$);
			return result;
		})
	);

	@Effect({ dispatch: false })
	vote$ = this.actions$.ofType<any>(ProductActionTypes.VOTE).pipe(
		map(action => action.payload),
		switchMap(({ id, value }) => {
			return this.srv.vote(id, value);
		})
	);

	// for pagination
	@Effect()
	loadMore$ = this.actions$
		.ofType<any>(ProductActionTypes.LOAD_MORE)
		.pipe(
			map(action => action.payload),
			switchMap((params: any) => this.srv.load(params)),
			map((r: any) => ProductActions.add(r))
		);

	@Effect()
	loadById$ = this.actions$
		.ofType<any>(ProductActionTypes.LOAD_BY_ID)
		.pipe(
			map(action => action.payload),
			switchMap((id: string) => this.srv.loadById(id)),
			map((r: any) => ProductActions.add(r))
		);

	// for feedback
	@Effect()
	requestFeedback$ = this.actions$
		.ofType<any>(ProductActionTypes.REQUEST_FEEDBACK)
		.pipe(
			map(action => action.payload),
			switchMap(({ productsIds, recipientsIds }) => {
				const obs$ = new Array<Observable<any>>();
				productsIds.forEach(projectid => {
					obs$.push(this.srv.requestFeedback(projectid, recipientsIds));
				});
				const result = Observable.forkJoin(obs$);
				return result;
			}),
			map((result: any) => ProductActions.requestFeedbackSuccess(result))
		);

	@Effect()
	downloadPdf$ = this.actions$
		.ofType<any>(ProductActionTypes.REQUEST_PDF)
		.pipe(
			map(action => action.payload),
			switchMap(id => this.srv.sendPdfReq(id)),
			map(path => FileActions.download(path))
		);

	@Effect({ dispatch: false })
	patch$ = this.actions$
		.ofType<any>(ProductActionTypes.PATCH)
		.pipe(
			map(action => action.payload),
			switchMap((p: any) => this.srv.sendPatchRequest(p))
		);

	constructor(
		private srv: ProductService,
		private actions$: Actions,
		private store: Store<any>
	) {
		this.store
			.select(selectUser)
			.pipe(map(user => user.id))
			.subscribe(id => (this.userID = id));
	}
}
