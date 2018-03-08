import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
	TeamActionTypes as ActionType,
	TeamActions,
} from '../../action/entities';
import { TeamService } from '../../services/team.service';
import { switchMap, map, tap } from 'rxjs/operators';

@Injectable()
export class TeamEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(ActionType.LOAD)
		.pipe(
			switchMap(_ => this.srv.load()),
			map((result: any) => TeamActions.add(result))
		);

	constructor(private action$: Actions, private srv: TeamService) {}
}
