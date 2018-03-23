import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { actionTypes } from './notification.action';
import { map, tap } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class NotificationEffects {
	@Effect({ dispatch: false })
	add$ = this.actions$
		.ofType<any>(actionTypes.ADD)
		.pipe(map(action => action.payload), tap(notification => this.srv.add({ ...notification })));

	constructor(private actions$: Actions, private srv: NotificationService) {}
}
