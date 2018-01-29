import { TypedAction } from '../../utils/typed-action.interface';
import { Team } from '../../model/entities/team.model';
import { ActionType } from '../../action/entities/team.action';
import { entityInitialState, EntityState, addEntities, copyById } from '../../utils/entities.utils';


export function teamsReducer(state = entityInitialState, action: TypedAction<any> ): EntityState<Team> {
	switch (action.type) {
		case ActionType.ADD:
			return addEntities(state, action.payload);
		default: return state;
	}
}
