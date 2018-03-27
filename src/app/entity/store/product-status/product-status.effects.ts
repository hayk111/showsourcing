import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { productStatusActions, productStatusActionTypes } from './product-status.action';

@Injectable()
export class ProductStatusEffects {
	@Effect()
	load$ = this.action$.ofType<any>(productStatusActionTypes.LOAD).pipe(
		switchMap(_ => this.http.get(`api/constants/product-status`)),
		// we receive an array of string, instead we need entities so we can transform those string into entities
		map((result: Array<string>) => result.map(str => ({ id: str, name: str.splitPascalCase() }))),
		map((result: any) => productStatusActions.add(result))
	);

	constructor(private action$: Actions, private http: HttpClient) { }
}
