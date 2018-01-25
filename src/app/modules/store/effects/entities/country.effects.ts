import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, tap } from 'rxjs/operators';
import { CountryService } from '../../services/country.service';
import { ActionType, CountryActions } from '../../action/entities/country.action';



@Injectable()
export class CountryEffects {

	@Effect()
	load$ = this.action$.ofType<any>(ActionType.LOAD).pipe(
		switchMap(_ => this.srv.load()),
		map((result: any) => CountryActions.setCountries(result))
	);

	constructor( private action$: Actions, private srv: CountryService) {}
}
