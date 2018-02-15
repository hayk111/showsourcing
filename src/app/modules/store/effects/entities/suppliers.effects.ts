import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, tap } from 'rxjs/operators';
import { ActionType, SupplierActions } from '../../action/entities/supplier.action';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../model/entities/supplier.model';


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


	constructor( private action$: Actions, private srv: SupplierService) {}
}

