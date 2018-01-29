import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { ActionType, CustomFieldsActions } from '../../action/entities/custom-fields.action';
import { map, switchMap } from 'rxjs/operators';
import { CustomFieldsService } from '../../services/custom-fields.service';
import { Store } from '@ngrx/store';

@Injectable()
export class CustomFieldsEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap(({id, maxCounter}) => this.srv.load(id, maxCounter)),
		map((result: any) => CustomFieldsActions.set(result))
	);


	constructor(private actions$: Actions, private srv: CustomFieldsService, private store: Store<any>) {}
}
