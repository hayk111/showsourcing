import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { countryActionTypes as ActionType, countryActions } from './country.action';
import { switchMap, map } from 'rxjs/operators';
import { EntityService } from '~entity/store/entity.service';
import { ERM } from '~entity/store/entity.model';

@Injectable()
export class CountryEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(ActionType.LOAD)
		.pipe(
			switchMap(_ => this.srv.load({ target: ERM.countries })),
			map((result: any) => countryActions.add(result))
		);

	constructor(private action$: Actions, private srv: EntityService) { }
}
