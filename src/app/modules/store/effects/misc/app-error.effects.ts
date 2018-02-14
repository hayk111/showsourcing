import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { TypedAction } from '../../utils/typed-action.interface';
import { switchMap } from 'rxjs/operators';
import { ActionType, AppErrorActions } from '../../action/misc/app-errors.action';
import { AppError } from '../../model/misc/app-error.model';
import { FeedbackParams, FeedbackStyle, FeedbackDlgActions } from '../../action/ui/feedback-dlg.action';


@Injectable()
export class AppErrorsEffects {

	// // Listen for the patch action
	@Effect()
	add: Observable<any> = this.actions$.ofType(ActionType.ADD)
		.do(x => console.log(x))
		.map((action: TypedAction<AppError>) => action.payload)
		.map((e: Error) => FeedbackDlgActions.add(this.mapMessage(e))
	);

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
