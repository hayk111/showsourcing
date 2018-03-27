import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { teamMembersActions, teamMembersActionTypes as ActionType } from './team-members.action';
import { TeamMembersHttpService } from './team-members-http.service';

@Injectable()
export class TeamMembersEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(ActionType.LOAD)
		.pipe(switchMap(_ => this.srv.load()), map((result: any) => teamMembersActions.add(result)));

	constructor(private action$: Actions, private srv: TeamMembersHttpService) { }
}
