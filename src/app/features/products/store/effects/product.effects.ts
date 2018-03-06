import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { ProductService } from '~products/services/product.service';
import { FileTargetActions } from '~features/file';
import { AppFile } from '~features/file';
import { selectUser } from '~user/store/selectors/user.selector';

import { ActionTypes, ProductActions } from '../actions/product.action';

@Injectable()
export class ProductEffects {
	userID: string;

	@Effect()
	load$ = this.actions$.ofType<any>(ActionTypes.LOAD).pipe(
		map(action => action.payload),
		switchMap((params: any) => {
			// get products
			return this.srv.load(params).pipe(
				// set products
				map((r: any) => ProductActions.add(r)),
				// before everything set products as pending
				startWith(ProductActions.setPending() as any)
			);
		})
	);

	@Effect()
	downloadPdf$ = this.actions$
		.ofType<any>(ActionTypes.REQUEST_PDF)
		.pipe(
			map(action => action.payload),
			switchMap(id => this.srv.sendPdfReq(id)),
			map(path => FileTargetActions.download({ url: path } as AppFile))
		);

	@Effect({ dispatch: false })
	patch$ = this.actions$
		.ofType<any>(ActionTypes.PATCH)
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
