import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { teamActionTypes as ActionType, teamActions } from '../../action/entities';
import { TeamHttpService } from '../../services/team-http.service';
import { switchMap, map, tap } from 'rxjs/operators';

@Injectable()
export class TeamEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(ActionType.LOAD)
		.pipe(switchMap(_ => this.srv.load()), map((result: any) => teamActions.add(result)));

	constructor(private action$: Actions, private srv: TeamHttpService) {}
}
