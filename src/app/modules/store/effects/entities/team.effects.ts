import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { TeamService } from '../../services/team.service';
import { TeamActions, ActionType } from '../../action/entities/team.action';


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
