import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { fromCountry } from './country.bundle';
import { switchMap, map } from 'rxjs/operators';
import { EntityService } from '~entity/store/entity.service';
import { ERM } from '~entity/store/entity.model';

@Injectable()
export class CountryEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(fromCountry.ActionTypes.LOAD)
		.pipe(
			switchMap(_ => this.srv.load({ target: ERM.country })),
			map((result: any) => fromCountry.Actions.add(result))
		);

	constructor(private action$: Actions, private srv: EntityService) { }
}
