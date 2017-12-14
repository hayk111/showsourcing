import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ActionType, TeamActions } from '../action/team.action';
import { TeamService } from '../services/team.service';
import { switchMap, map } from 'rxjs/operators';


@Injectable()
export class TeamEffects {

	@Effect()
	load$ = this.action$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap(counter => this.srv.load(counter)),
		map((result: any) => TeamActions.setTeams(result))
	);

	constructor( private action$: Actions, private srv: TeamService) {}
}
