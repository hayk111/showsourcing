import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TypedAction } from '~app/app-root/utils';
import { AppError } from '~app/shared/error-handler/app-error.model';
import { actionType } from '~app/shared/error-handler/app-errors.action';
import { Notification, NotificationType } from '~shared/notifications/model';
import { NotificationService } from '~app/shared/notifications';

@Injectable()
export class AppErrorsEffects {
	@Effect({ dispatch: false })
	add: Observable<any> = this.actions$
		.ofType(actionType.ADD)
		.pipe(
			map((action: TypedAction<AppError>) => action.payload),
			tap((e: Error) => this.notificationSrv.add(this.mapMessage(e)))
		);

	mapMessage(e: Error | any): Notification {
		const notif: Notification = { title: 'Error', type: NotificationType.ERROR };
		if (e.status === 0) notif.message = 'Your connection seems to be down';
		else notif.message = 'Unknown error, try again';
		return notif;
	}

	constructor(private actions$: Actions, private notificationSrv: NotificationService) { }
}
