import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { IncoTermsActionTypes as ActionType, IncoTermsActions } from '../../action/entities/index';
import { switchMap, map } from 'rxjs/operators';
import { IncoTermsService } from '~app/app-root/store/services/inco-terms.service';

@Injectable()
export class IncoTermsEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(ActionType.LOAD)
		.pipe(switchMap(_ => this.srv.load()), map((result: any) => IncoTermsActions.add(result)));

	constructor(private action$: Actions, private srv: IncoTermsService) {}
}
