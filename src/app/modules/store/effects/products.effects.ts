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


@Injectable()
export class ProductEffects {
	userID: string;


	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap(filterGroupName => {
			// get products
			return this.srv.load(filterGroupName).pipe(
				// set products
				map(r => ProductActions.set(r)),
				// before everything set products as pending
				startWith(ProductActions.setPending() as any)
			);
		})
	);

	// loads a product if it's not already present in the store
	@Effect()
	loadOne$ = this.actions$.ofType<any>(ActionType.LOAD_BY_ID).pipe(
		map(action => action.payload),
		switchMap(id => this.store.select(selectProductById(id)).pipe(
			filter(product => product === undefined),
			switchMap(_ => this.srv.loadById(id)),
		)),
		map((product: Product) => ProductActions.add([product]))
	);

	constructor(private srv: ProductService, private actions$: Actions, private store: Store<any>) {
		this.store.select(selectUser).map(user => user.id)
			.subscribe(id => this.userID = id);
	}
}
