import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { IncoTermsActionTypes as ActionType, IncoTermsActions } from '../../action/entities/index';
import { switchMap, map } from 'rxjs/operators';
import { EntityService, ERM } from '~app/shared/entity';

@Injectable()
export class IncoTermsEffects {
	@Effect()
	load$ = this.action$.ofType<any>(ActionType.LOAD).pipe(
		switchMap(_ => this.srv.load({ target: ERM.incoTerms })),
		// we receive an array of string, instead we need entities so we can transform those string into entities
		map((result: Array<string>) => result.map(str => ({ id: str, name: str }))),
		map((result: any) => IncoTermsActions.add(result))
	);

	constructor(private action$: Actions, private srv: EntityService) {}
}
