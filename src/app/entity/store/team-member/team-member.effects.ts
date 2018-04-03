import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { fromTeamMember } from './team-member.bundle';
import { TeamMemberHttpService } from './team-member-http.service';

@Injectable()
export class TeamMembersEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(fromTeamMember.ActionTypes.LOAD)
		.pipe(switchMap(_ => this.srv.load()), map((result: any) => fromTeamMember.Actions.add(result)));

	constructor(private action$: Actions, private srv: TeamMemberHttpService) { }
}
