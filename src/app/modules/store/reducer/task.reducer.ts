import { TypedAction } from '../utils/typed-action.interface';
import { ActionType } from '../action/task.action';
import { Task } from '../model/task.model';
import { EntityState, setEntities, entityInitialState } from '../utils/entities.utils';


export function taskReducer(state: EntityState<Task> = entityInitialState, action: TypedAction<any> )
	: EntityState<Task> {
	switch (action.type) {
		case ActionType.SET_DATA:
			return setEntities(action.payload);
		case ActionType.SET_PENDING:
			return { ...state, pending: true };
		case ActionType.PATCH_PROPERTY:
			const id = action.payload.id;
			const propName = action.payload.propName;
			const value = action.payload.value;
			return  { ...state,
								byId: {
									...state.byId,
									[id] : {
										...state.byId[id],
										[propName]: value
									}
								}
							};
		default: return state;
	}
}
