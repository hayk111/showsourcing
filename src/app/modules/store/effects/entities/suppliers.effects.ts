import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { SupplierActionTypes as ActionType, SupplierActions } from '../../action/entities/index';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../model/entities/supplier.model';
import { of } from 'rxjs/observable/of';
import { AppErrorActions } from '../../action/misc/app-errors.action';


@Injectable()
export class SuppliersEffects {

	@Effect()
	load$ = this.action$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap(({id, maxCounter}) => this.srv.load(id, maxCounter)),
		map((result: any) => SupplierActions.add(result))
	);

	@Effect()
	loadById$ = this.action$.ofType<any>(ActionType.LOAD_BY_ID).pipe(
		map(action => action.payload),
		switchMap((id: any) => this.srv.loadById(id)),
		map((result: Supplier) => SupplierActions.add([result]))
	);

	@Effect()
	create$ = this.action$.ofType<any>(ActionType.CREATE).pipe(
		map(action => action.payload),
		switchMap(
			supplier => this.srv.create(supplier).pipe(
				map((r: any) => SupplierActions.replace(supplier, r)),
				catchError(e => of(AppErrorActions.add(e)))
			)
		)
	)


	constructor( private action$: Actions, private srv: SupplierService) {}
}

