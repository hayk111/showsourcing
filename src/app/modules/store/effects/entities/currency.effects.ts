import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { ActionType, CurrencyActions } from '../../action/entities/currency.action';
import { switchMap, map } from 'rxjs/operators';
import { CurrencyService } from '../../services/currency.service';



@Injectable()
export class CurrencyEffects {

	@Effect()
	load$ = this.action$.ofType<any>(ActionType.LOAD).pipe(
		switchMap(_ => this.srv.load()),
		map((result: any) => CurrencyActions.add(result))
	);

	constructor( private action$: Actions, private srv: CurrencyService) {}
}
