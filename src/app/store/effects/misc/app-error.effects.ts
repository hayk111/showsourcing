import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { TypedAction } from '../../utils/typed-action.interface';
import { ActionType } from '../../action/misc/app-errors.action';
import { AppError } from '../../model/misc/app-error.model';
import { FeedbackParams, FeedbackStyle, FeedbackDlgActions } from '../../action/ui/feedback-dlg.action';
import { map } from 'rxjs/operators';


@Injectable()
export class AppErrorsEffects {

	@Effect()
	add: Observable<any> = this.actions$.ofType(ActionType.ADD)
	.pipe(
		map((action: TypedAction<AppError>) => action.payload),
		map((e: Error) => FeedbackDlgActions.add(this.mapMessage(e))
	));

	mapMessage(e: Error | any) {
		const feedbackParams: FeedbackParams = { title: 'Error', styleType: FeedbackStyle.ERROR };
		if (e.status === 0 )
			feedbackParams.body = 'Your connection seems to be down';
		else
			feedbackParams.body = 'Unknown error, try again';
		return feedbackParams;
	}

	constructor(private actions$: Actions) {}

}
