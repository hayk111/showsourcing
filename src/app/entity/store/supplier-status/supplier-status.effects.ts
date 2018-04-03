import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { fromSupplierStatus } from './supplier-status.bundle';
import { switchMap, map } from 'rxjs/operators';
import { EntityService } from '~entity/store/entity.service';
import { ERM } from '~entity/store/entity.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SupplierStatusEffects {
	@Effect()
	load$ = this.action$.ofType<any>(fromSupplierStatus.ActionTypes.LOAD).pipe(
		switchMap(_ => this.http.get(`api/constants/supplier-status`)),
		// we receive an array of string, instead we need entities so we can transform those string into entities
		map((result: Array<string>) => result.map(str => ({ id: str, name: str.splitPascalCase() }))),
		map((result: any) => fromSupplierStatus.Actions.add(result))
	);

	constructor(private action$: Actions, private http: HttpClient) { }
}
