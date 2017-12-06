import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';
import { Team } from '../model/team.model';
import { User } from '../model/user.model';

export enum ActionType {
	SET_TEAMS = '[Team] setting',
	LOAD_MEMBERS = '[Team] loading team members',
	SET_MEMBERS = '[Team] setting team members'
}

export class TeamActions {
	static setTeams(payload: Array<Team>): TypedAction<Array<Team>> {
		return {
			type: ActionType.SET_TEAMS,
			payload
		};
	}

	static loadMembers(teamId: string) {
		return {
			type: ActionType.LOAD_MEMBERS,
			payload: teamId
		};
	}

}
