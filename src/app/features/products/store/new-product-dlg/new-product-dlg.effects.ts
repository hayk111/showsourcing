import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, mergeMap, catchError, tap } from 'rxjs/operators';
import { NotificationType } from '~app/shared/notifications/model/notification.interface';
import { notificationActions } from '~app/shared/notifications/store/notification.action';
import { appErrorActions } from '~app/shared/error-handler/app-errors.action';
import { of ,  merge ,  from } from 'rxjs';
import { DialogActions } from '~app/shared/dialog/store/dialog.action';
import { DialogName } from '~app/shared/dialog';
import { Router } from '@angular/router';
import { NewProductDlgActionType, NewProductDlgActions } from '~app/features/products/store/new-product-dlg/new-product-dlg.actions';
import { productActions } from '~app/features/products/store/product';
import { ProductHttpService } from '~app/features/products/store/product/product-http.service';


@Injectable()
export class NewProductDlgEffects {

	constructor(private actions$: Actions, private srv: ProductHttpService, private router: Router) { }

	@Effect()
	create$ = this.actions$.ofType<any>(NewProductDlgActionType.CREATE_PRODUCT)
		.pipe(
			map(action => action.payload),
			switchMap(product =>
				this.srv
					.create(product)
					.pipe(
						tap((newProduct: any) => this.router.navigate(['product', 'details', newProduct.id, 'general  '])),
						mergeMap((newProduct: any) => [
							productActions.replace([newProduct]),
							notificationActions.add({ type: NotificationType.SUCCESS, title: 'Product Added', timeout: 2000 }),
							DialogActions.close(DialogName.NEW_PRODUCT),
							NewProductDlgActions.setReady()
						]),
						catchError(e =>
							from([appErrorActions.add(e), NewProductDlgActions.setReady()]))
					)
			)
		);
}

