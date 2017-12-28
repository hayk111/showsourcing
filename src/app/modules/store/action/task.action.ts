import { Action } from '@ngrx/store';
import { Task } from '../model/task.model';
import { TypedAction } from '../utils/typed-action.interface';
import { FilterGroupName } from '../model/filter.model';

export enum ActionType {
		LOAD = '[Task] loading',
		SET = '[Task] setting',
		SET_PENDING = '[Task] pending',
}

export class TaskActions {

	static load(filterGroupName: FilterGroupName) {
		return {
			type: ActionType.LOAD,
			payload: filterGroupName
		};
	}

	static set(payload: Array<Task>): TypedAction<Array<Task>> {
		return {
			type: ActionType.SET,
			payload
		};
	}

	static setPending() {
		return {
			type: ActionType.SET_PENDING
		};
	}
}
