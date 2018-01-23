import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { ActionType, ProductActions } from '../action/product.action';
import { TypedAction } from '../utils/typed-action.interface';
import { switchMap, map, merge, mergeMap, startWith, tap, filter } from 'rxjs/operators';
import { zip } from 'rxjs/observable/zip';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { User } from '../model/user.model';
import { selectUser } from '../selectors/user.selector';
import { AppComment } from '../model/comment.model';
import { uuid } from '../utils/uuid.utils';
import { AppFile } from '../model/app-file.model';
import { ProductService } from '../services/product.service';
import { selectProductById } from '../selectors/products.selector';
import { Product } from '../model/product.model';
import { Tag } from '../model/tag.model';
import { Project } from '../model/project.model';
import { Task } from '../model/task.model';
import { TaskActions } from '../action/task.action';
import { retryWhen } from 'rxjs/operators/retryWhen';
import { FileActions } from '../action/file.action';


@Injectable()
export class ProductEffects {
	userID: string;


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

	constructor(private srv: ProductService, private actions$: Actions, private store: Store<any>) {
		this.store.select(selectUser).map(user => user.id)
			.subscribe(id => this.userID = id);
	}
}
