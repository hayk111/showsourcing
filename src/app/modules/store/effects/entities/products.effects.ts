import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ActionType, ProductActions } from '../../action/entities/product.action';
import { map, startWith, switchMap } from 'rxjs/operators';
import { selectUser } from '../../selectors/entities/user.selector';
import { AppFile } from '../../model/entities/app-file.model';
import { ProductService } from '../../services/product.service';
import { FileTargetActions } from '../../action/target/file.action';



@Injectable()
export class ProductEffects {
	userID: string;

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap((params: {id, maxCounter}) => {
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
	downloadPdf$ = this.actions$.ofType<any>(ActionType.REQUEST_PDF).pipe(
		map(action => action.payload),
		switchMap(id => this.srv.sendPdfReq(id)),
		map(path => FileTargetActions.download({ url: path } as AppFile))
	);

	@Effect({ dispatch: false })
	patch$ = this.actions$.ofType<any>(ActionType.PATCH).pipe(
		map(action => action.payload),
		switchMap((p: any) => this.srv.sendPatchRequest(p))
	);

	constructor(private srv: ProductService, private actions$: Actions, private store: Store<any>) {
		this.store.select(selectUser).map(user => user.id)
			.subscribe(id => this.userID = id);
	}
}
