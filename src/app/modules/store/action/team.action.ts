import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';
import { Team } from '../model/team.model';

export enum ActionType {
		SET_TEAMS = '[Team] setting',
}

export class TeamActions {
		static setTeams(payload: Array<Team>): TypedAction<Array<Team>> {
				return {
						type: ActionType.SET_TEAMS,
						payload
				};
		}

}
