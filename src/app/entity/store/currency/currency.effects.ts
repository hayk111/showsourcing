import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ERM } from '~entity/store/entity.model';
import { EntityService } from '~entity/store/entity.service';

import { currencyActions, currencyActionTypes as ActionType } from './currency.action';

@Injectable()
export class CurrencyEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(ActionType.LOAD)
		.pipe(
			switchMap(_ => this.srv.load({ target: ERM.currency })),
			map((result: any) => currencyActions.add(result))
		);

	constructor(private action$: Actions, private srv: EntityService) { }
}
