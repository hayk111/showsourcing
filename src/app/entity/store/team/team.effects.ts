import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { TeamHttpService } from './team-http.service';
import { teamActions, teamActionTypes as ActionType } from './team.action';

@Injectable()
export class TeamEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(ActionType.LOAD)
		.pipe(switchMap(_ => this.srv.load()), map((result: any) => teamActions.add(result)));

	constructor(private action$: Actions, private srv: TeamHttpService) { }
}
