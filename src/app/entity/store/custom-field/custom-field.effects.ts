import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { fromCustomField } from './custom-field.bundle';
import { CustomFieldsHttpService } from './custom-field-http.service';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable()
export class CustomFieldsEffects {
	@Effect()
	load$ = this.actions$
		.ofType<any>(fromCustomField.ActionTypes.LOAD)
		.pipe(switchMap(_ => this.srv.load()), map((result: any) => fromCustomField.Actions.add(result)));

	constructor(private actions$: Actions, private srv: CustomFieldsHttpService, private store: Store<any>) { }
}
