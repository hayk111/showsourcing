import { Action } from '@ngrx/store';
import { FilterGroupName } from '../../model/misc/filter.model';
import { Task } from '../../model/entities/task.model';

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

	static set(payload: Array<Task>) {
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
