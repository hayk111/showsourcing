import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ActionType } from '../../action/ui/feedback-dlg.action';
import { map, tap } from 'rxjs/operators';
import { NotificationService } from '@swimlane/ngx-ui';
import * as fontawesome from '@fortawesome/fontawesome';



@Injectable()
export class FeedbackDlgEffects {

	@Effect({ dispatch: false })
	add$ = this.actions$.ofType<any>(ActionType.ADD).pipe(
		map(action => action.payload),
		tap(params => {this.srv.create(params)}),
	)

	constructor(private actions$: Actions, private srv: NotificationService) {}


}