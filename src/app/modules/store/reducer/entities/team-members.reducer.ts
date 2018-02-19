import { User } from '../../model/entities/user.model';
import { TeamMembersActionTypes as ActionType } from '../../action/entities/index';
import { EntityState, entityInitialState, addEntities } from '../../utils/entities.utils';

export function teamMembersReducer( state: EntityState<User> = entityInitialState, action) {
	switch (action.type) {

		case ActionType.ADD:
			return addEntities(entityInitialState, action.payload);

		default:
			return state;
	}
}
