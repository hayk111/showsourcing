import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { SupplierListActionType, SupplierListActions } from './supplier-list.bundle';
import { map, switchMap } from 'rxjs/operators';
import { SupplierHttpService } from '~app/entity/store/supplier/supplier-http.service';
import { Supplier } from '~app/entity/store/supplier/supplier.model';
import { ApiParams } from '~app/entity';


@Injectable()
export class SupplierListEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(SupplierListActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap((params: ApiParams) => this.srv.loadAsync(params)),
		map((r: Array<Supplier>) => SupplierListActions.add(r))
	);

	constructor(private actions$: Actions, private srv: SupplierHttpService) { }

}

