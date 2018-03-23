import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { TypedAction } from '~app/app-root/utils';
import { AppError } from '~app/shared/error-handler/app-error.model';
import { actionType } from '~app/shared/error-handler/app-errors.action';
import { notificationActions } from '~app/shared/notifications/store/notification.action';
import { Notification, NotificationType } from '~shared/notifications/model';

@Injectable()
export class AppErrorsEffects {
	@Effect()
	add: Observable<any> = this.actions$
		.ofType(actionType.ADD)
		.pipe(
			map((action: TypedAction<AppError>) => action.payload),
			map((e: Error) => notificationActions.add(this.mapMessage(e)))
		);

	mapMessage(e: Error | any): Notification {
		const notif: Notification = { title: 'Error', type: NotificationType.ERROR };
		if (e.status === 0) notif.message = 'Your connection seems to be down';
		else notif.message = 'Unknown error, try again';
		return notif;
	}

	constructor(private actions$: Actions) {}
}
