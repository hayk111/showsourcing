import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { currencyActionTypes as ActionType, currencyActions } from './currency.action';
import { switchMap, map } from 'rxjs/operators';
import { EntityService, ERM } from '~entity';

@Injectable()
export class CurrencyEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(ActionType.LOAD)
		.pipe(
			switchMap(_ => this.srv.load({ target: ERM.currencies })),
			map((result: any) => currencyActions.add(result))
		);

	constructor(private action$: Actions, private srv: EntityService) { }
}
