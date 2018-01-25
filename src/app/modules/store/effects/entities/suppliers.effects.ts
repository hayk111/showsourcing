import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, tap } from 'rxjs/operators';
import { SupplierService } from '../../services/supplier.service';
import { SupplierActions, ActionType } from '../../action/entities/supplier.action';


@Injectable()
export class SuppliersEffects {

	@Effect()
	load$ = this.action$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap(({id, maxCounter}) => this.srv.load(id, maxCounter)),
		map((result: any) => SupplierActions.addSuppliers(result))
	);

	constructor( private action$: Actions, private srv: SupplierService) {}
}

