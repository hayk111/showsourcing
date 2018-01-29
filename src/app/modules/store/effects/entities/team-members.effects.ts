import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { switchMap, map, tap } from 'rxjs/operators';
import { TeamMembersActions, ActionType } from '../../action/entities/team-members.action';
import { TeamMembersService } from '../../services/team-members.service';


@Injectable()
export class TeamMembersEffects {

	@Effect()
	load$ = this.action$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap(({id, maxCounter}) => this.srv.load(id, maxCounter)),
		map((result: any) => TeamMembersActions.add(result))
	);

	constructor( private action$: Actions, private srv: TeamMembersService) {}
}
