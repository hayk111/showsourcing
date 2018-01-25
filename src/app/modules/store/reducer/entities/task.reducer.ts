import { EntityState, entityInitialState, addEntities } from '../../utils/entities.utils';
import { Task } from '../../model/entities/task.model';
import { TypedAction } from '../../utils/typed-action.interface';
import { ActionType } from '../../action/entities/task.action';



export function taskReducer(state: EntityState<Task> = entityInitialState, action: TypedAction<any> )
	: EntityState<Task> {

	switch (action.type) {

		case ActionType.ADD:
			return addEntities(action.payload);

		case ActionType.SET_PENDING:
			return { ...state, pending: true };

		default: return state;
	}
}
