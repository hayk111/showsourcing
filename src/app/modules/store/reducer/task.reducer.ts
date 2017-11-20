import { TypedAction } from "../utils/typed-action.interface";
import { ActionType } from "../action/task.action";
import { Task } from "../model/task.model";
import { AsyncEntity } from "../utils/async-entity.utils";


const initialState = {
	pending: false,
	data: []
}


export function taskReducer(state: AsyncEntity<Task> = initialState, action: TypedAction<Array<Task>> )
	: AsyncEntity<Task> {
	switch (action.type) {
		case ActionType.SET_DATA:
			return { ...state, data: action.payload, pending: false };
		case ActionType.SET_PENDING:
			return { ...state, pending: true };
		default: return state;
	}
}
