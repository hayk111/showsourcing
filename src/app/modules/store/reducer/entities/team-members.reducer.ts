import { User } from '../../model/entities/user.model';
import { ActionType } from '../../action/entities/team-members.action';
import { EntityState, entityInitialState, addEntities } from '../../utils/entities.utils';

export function teamMembersReducer( state: EntityState<User> = entityInitialState, action) {
	switch (action.type) {

		case ActionType.ADD_TEAM_MEMBERS:
			return addEntities(entityInitialState, action.payload);

		default:
			return state;
	}
}
