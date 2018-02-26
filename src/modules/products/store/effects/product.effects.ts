import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, startWith, switchMap } from 'rxjs/operators';
import { ProductService } from '~products/services/product.service';
import { FileTargetActions } from '~store/action/target/file.action';
import { AppFile } from '~store/model/entities/app-file.model';
import { selectUser } from '~user/store/selectors/user.selector';

import { ActionTypes, ProductActionsFactory } from '../actions/product.action';

@Injectable()
export class ProductEffects {
	userID: string;

	@Effect()
	load$ = this.actions$.ofType<any>(ActionTypes.LOAD).pipe(
		map(action => action.payload),
		switchMap((params: { id; maxCounter }) => {
			// get products
			return this.srv.load(params).pipe(
				// set products
				map((r: any) => ProductActionsFactory.add(r)),
				// before everything set products as pending
				startWith(ProductActionsFactory.setPending() as any)
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
		.pipe(map(action => action.payload), switchMap((p: any) => this.srv.sendPatchRequest(p)));

	constructor(private srv: ProductService, private actions$: Actions, private store: Store<any>) {
		this.store
			.select(selectUser).pipe(
				map(user => user.id)
			).subscribe(id => (this.userID = id));
	}
}
