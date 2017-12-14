import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ActionType, CountryActions } from '../action/country.action';
import { CountryService } from '../services/country.service';
import { switchMap, map, tap } from 'rxjs/operators';



@Injectable()
export class CountryEffects {

	@Effect()
	load$ = this.action$.ofType<any>(ActionType.LOAD).pipe(
		tap(d => { debugger}),
		switchMap(_ => this.srv.load()),
		map((result: any) => CountryActions.setCountries(result))
	);

	constructor( private action$: Actions, private srv: CountryService) {}
}
