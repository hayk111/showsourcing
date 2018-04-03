import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { TeamHttpService } from './team-http.service';
import { fromTeam } from './team.bundle';

@Injectable()
export class TeamEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(fromTeam.ActionTypes.LOAD)
		.pipe(switchMap(_ => this.srv.load()), map((result: any) => fromTeam.Actions.add(result)));

	constructor(private action$: Actions, private srv: TeamHttpService) { }
}
