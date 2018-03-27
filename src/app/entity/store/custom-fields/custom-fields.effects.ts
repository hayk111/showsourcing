import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { customFieldsActionTypes as ActionType, customFieldsActions } from '../../action/entities/index';
import { map, switchMap } from 'rxjs/operators';
import { CustomFieldsHttpService } from '../../services/custom-fields-http.service';
import { Store } from '@ngrx/store';

@Injectable()
export class CustomFieldsEffects {
	@Effect()
	load$ = this.actions$
		.ofType<any>(ActionType.LOAD)
		.pipe(switchMap(_ => this.srv.load()), map((result: any) => customFieldsActions.add(result)));

	constructor( private actions$: Actions, private srv: CustomFieldsHttpService, private store: Store<any>) {}
}
