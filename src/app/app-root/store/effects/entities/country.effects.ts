import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { CountryActionTypes as ActionType, CountryActions } from '../../action/entities/index';
import { switchMap, map } from 'rxjs/operators';
import { CountryService } from '~store/services/country.service';



@Injectable()
export class CountryEffects {

	@Effect()
	load$ = this.action$.ofType<any>(ActionType.LOAD).pipe(
		switchMap(_ => this.srv.load()),
		map((result: any) => CountryActions.add(result))
	);

	constructor( private action$: Actions, private srv: CountryService) {}
}
