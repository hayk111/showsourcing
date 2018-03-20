import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HarbourActionTypes as ActionType, HarbourActions } from '../../action/entities/index';
import { switchMap, map } from 'rxjs/operators';
import { EntityService, ERM } from '~app/shared/entity';

@Injectable()
export class HarbourEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(ActionType.LOAD)
		.pipe(
			switchMap(_ => this.srv.load({ loaded: ERM.harbours })),
			map((result: any) => HarbourActions.add(result))
		);

	constructor(private action$: Actions, private srv: EntityService) {}
}
