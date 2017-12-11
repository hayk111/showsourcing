import { Action } from '@ngrx/store';
import { Task } from '../model/task.model';
import { TypedAction } from '../utils/typed-action.interface';
import { FilterGroupName } from '../model/filter.model';

export enum ActionType {
		LOAD = '[Task] loading',
		SET_DATA = '[Task] setting',
		SET_PENDING = '[Task] pending',
		PATCH_PROPERTY = '[Task] patch'
}

export class TaskActions {

	static load(filterGroupName: FilterGroupName) {
		return {
			type: ActionType.LOAD,
			payload: filterGroupName
		};
	}

	static setData(payload: Array<Task>): TypedAction<Array<Task>> {
		return {
			type: ActionType.SET_DATA,
			payload
		};
	}

	static setPending() {
		return {
			type: ActionType.SET_PENDING
		};
	}

	static patch(id: string, propName: string, value: any) {
		return {
			type: ActionType.PATCH_PROPERTY,
			payload: { id, propName, value }
		};
	}
}
