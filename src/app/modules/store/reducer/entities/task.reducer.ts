import { TypedAction } from '../utils/typed-action.interface';
import { ActionType } from '../action/task.action';
import { Task } from '../model/task.model';
import { EntityState, setEntities, entityInitialState } from '../utils/entities.utils';


export function taskReducer(state: EntityState<Task> = entityInitialState, action: TypedAction<any> )
	: EntityState<Task> {

	switch (action.type) {

		case ActionType.SET:
			return setEntities(action.payload);

		case ActionType.SET_PENDING:
			return { ...state, pending: true };

		default: return state;
	}
}
