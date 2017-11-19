import { TypedAction } from "../utils/typed-action.interface";
import { ActionType } from "../action/task.action";
import { Task } from "../model/task.model";


const initialState = {
	pending: false,
	data: []
}

export interface TasksState {
	pending: boolean;
	data: Array<Task>;
}

export function taskReducer(state = initialState, action: TypedAction<Array<Task>> ): TasksState {
	switch (action.type) {
		case ActionType.SET_DATA:
			return { ...state, data: action.payload, pending: false };
		case ActionType.SET_PENDING:
			return { ...state, pending: true };
		default: return state;
	}
}
