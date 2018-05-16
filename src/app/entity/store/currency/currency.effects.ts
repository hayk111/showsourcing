import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ERM } from '~app/entity/store/entity.model';
import { EntityService } from '~app/entity/store/entity.service';

import { fromCurrency } from './currency.bundle';

const ActionType = fromCurrency.ActionTypes;

@Injectable()
export class CurrencyEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(ActionType.LOAD)
		.pipe(
			switchMap(_ => this.srv.load({ target: ERM.currency })),
			map((result: any) => fromCurrency.Actions.add(result))
		);

	constructor(private action$: Actions, private srv: EntityService) { }
}
