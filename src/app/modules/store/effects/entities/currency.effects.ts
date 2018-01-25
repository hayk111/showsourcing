import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyActions, ActionType } from '../../action/entities/currency.action';



@Injectable()
export class CurrencyEffects {

	@Effect()
	load$ = this.action$.ofType<any>(ActionType.LOAD).pipe(
		switchMap(_ => this.srv.load()),
		map((result: any) => CurrencyActions.setCurrencies(result))
	);

	constructor( private action$: Actions, private srv: CurrencyService) {}
}
