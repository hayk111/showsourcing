import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { CustomFieldsActionTypes as ActionType, CustomFieldsActions } from '../../action/entities/index';
import { map, switchMap } from 'rxjs/operators';
import { CustomFieldsService } from '../../services/custom-fields.service';
import { Store } from '@ngrx/store';

@Injectable()
export class CustomFieldsEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		switchMap(_ => this.srv.load()),
		map((result: any) => CustomFieldsActions.add(result))
	);


	constructor(private actions$: Actions, private srv: CustomFieldsService, private store: Store<any>) {}
}
