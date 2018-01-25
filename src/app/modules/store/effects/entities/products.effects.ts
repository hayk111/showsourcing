import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
import { ProductActions, ActionType } from '../../action/entities/product.action';
import { switchMap, startWith } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { FileActions } from '../../action/entities/file.action';
import { AppFile } from '../../model/entities/app-file.model';
import { ProductService } from '../../services/product.service';


@Injectable()
export class ProductEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap((params: {teamId, counter}) => {
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
		map(path => FileActions.download({ url: path } as AppFile))
	);

	@Effect({ dispatch: false })
	patch$ = this.actions$.ofType<any>(ActionType.PATCH).pipe(
		map(action => action.payload),
		switchMap((p: any) => this.srv.sendPatchRequest(p))
	);

	@Effect()
	addComment$ = this.actions$.ofType<any>(CommentAction.ADD).pipe(
		map(action => action.payload),
		// we add the current selection to the payload
		filter((p: { target: EntityTarget}) => p.target.entityRepr === entityRepresentationMap.product)
	)

	constructor(private srv: ProductService, private actions$: Actions) {

	}
}
