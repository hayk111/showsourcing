import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ActionType, TeamActions } from '../../action/entities/team.action';
import { TeamService } from '../../services/team.service';
import { switchMap, map, tap } from 'rxjs/operators';


@Injectable()
export class TeamEffects {

	@Effect()
	load$ = this.action$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		tap(d => { debugger; }),
		switchMap(counter => this.srv.load(counter)),
		map((result: any) => TeamActions.add(result))
	);

	constructor( private action$: Actions, private srv: TeamService) {}
}
