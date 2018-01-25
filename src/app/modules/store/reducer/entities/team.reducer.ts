import { TypedAction } from '../../utils/typed-action.interface';
import { EntityState, entityInitialState, addEntities } from '../../utils/entities.utils';
import { Team } from '../../model/entities/team.model';
import { ActionType } from '../../action/entities/team.action';




export function teamsReducer(state = entityInitialState, action: TypedAction<any> ): EntityState<Team> {
	switch (action.type) {
		case ActionType.SET_TEAMS:
			return addEntities(state, action.payload);
		default: return state;
	}
}
