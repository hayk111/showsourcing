import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { ActionType } from './new-supplier-dlg.bundle';
import { map, switchMap, mergeMap, catchError, tap } from 'rxjs/operators';
import { NotificationType } from '~app/shared/notifications/model/notification.interface';
import { notificationActions } from '~app/shared/notifications/store/notification.action';
import { appErrorActions } from '~app/shared/error-handler/app-errors.action';
import { SupplierHttpService } from '~app/entity/store/supplier/supplier-http.service';
import { of } from 'rxjs/observable/of';
import { Swap } from '~entity/utils';
import { supplierActions } from '~app/entity/store/supplier/supplier.action';
import { DialogActions } from '~app/shared/dialog/store/dialog.action';
import { DialogName } from '~app/shared/dialog';
import { Router } from '@angular/router';

@Injectable()
export class NewSupplierDlgEffects {

	constructor(private actions$: Actions, private srv: SupplierHttpService, private router: Router) { }

	@Effect()
	create$ = this.actions$.ofType<any>(ActionType.CREATE_SUPPLIER)
		.pipe(
			map(action => action.payload),
			switchMap(supplier =>
				this.srv
					.create(supplier)
					.pipe(
						tap((newSupplier: any) => this.router.navigate(['supplier', 'details', newSupplier.id])),
						mergeMap((newSupplier: any) => [
							supplierActions.replace([new Swap(supplier, newSupplier)]),
							notificationActions.add({ type: NotificationType.SUCCESS, title: 'Supplier Added', timeout: 2000 }),
							DialogActions.close(DialogName.NEW_SUPPLIER)
						]),
						catchError(e => of(appErrorActions.add(e)))
					)
			)
		);
}

