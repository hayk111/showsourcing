import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { TeamMembersActions, TeamMembersActionTypes as ActionType } from '../../action/entities/index';
import { TeamMembersService } from '../../services/team-members.service';


@Injectable()
export class TeamMembersEffects {

	@Effect()
	load$ = this.action$.ofType<any>(ActionType.LOAD).pipe(
		switchMap(_ => this.srv.load()),
		map((result: any) => TeamMembersActions.add(result))
	);

	constructor( private action$: Actions, private srv: TeamMembersService) {}
}
