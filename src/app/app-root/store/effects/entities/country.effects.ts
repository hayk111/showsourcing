import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { countryActionTypes as ActionType, countryActions } from '../../action/entities/index';
import { switchMap, map } from 'rxjs/operators';
import { EntityService, ERM } from '~entity';

@Injectable()
export class CountryEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(ActionType.LOAD)
		.pipe(
			switchMap(_ => this.srv.load({ target: ERM.countries })),
			map((result: any) => countryActions.add(result))
		);

	constructor(private action$: Actions, private srv: EntityService) {}
}
