import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ActionType, SupplierActions } from './supplier.action';
import { SupplierService } from '~suppliers/services';
import { Supplier } from '~suppliers/models';
import { of } from 'rxjs/observable/of';
import { AppErrorActions } from '~store/action/misc/app-errors.action';
import { Swap } from '~app/shared/entity/utils';

@Injectable()
export class SuppliersEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(ActionType.LOAD)
		.pipe(switchMap(_ => this.srv.load()), map((result: any) => SupplierActions.add(result)));

	@Effect()
	loadById$ = this.action$
		.ofType<any>(ActionType.LOAD_BY_ID)
		.pipe(
			map(action => action.payload),
			switchMap((id: any) => this.srv.loadById(id)),
			map((result: Supplier) => SupplierActions.add([result]))
		);

	@Effect()
	create$ = this.action$
		.ofType<any>(ActionType.CREATE)
		.pipe(
			map(action => action.payload),
			switchMap(supplier =>
				this.srv
					.create(supplier)
					.pipe(
						map(
							(r: any) => SupplierActions.replace([new Swap(supplier, r)]),
							catchError(e => of(AppErrorActions.add(e)))
						)
					)
			)
		);

	constructor(private action$: Actions, private srv: SupplierService) {}
}