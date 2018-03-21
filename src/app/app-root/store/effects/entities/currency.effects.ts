import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { CurrencyActionTypes as ActionType, CurrencyActions } from '../../action/entities/index';
import { switchMap, map } from 'rxjs/operators';
import { EntityService, ERM } from '~entity';

@Injectable()
export class CurrencyEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(ActionType.LOAD)
		.pipe(
			switchMap(_ => this.srv.load({ target: ERM.currencies })),
			map((result: any) => CurrencyActions.add(result))
		);

	constructor(private action$: Actions, private srv: EntityService) {}
}
