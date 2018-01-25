import { Action } from '@ngrx/store';
import { FilterGroupName } from '../../model/misc/filter.model';
import { Task } from '../../model/entities/task.model';

export enum ActionType {
		LOAD = '[Task] loading',
		ADD = '[Task] adding',
		SET_PENDING = '[Task] pending',
}

export class TaskActions {

	static load(filterGroupName: FilterGroupName) {
		return {
			type: ActionType.LOAD,
			payload: filterGroupName
		};
	}

	static add(payload: Array<Task>) {
		return {
			type: ActionType.ADD,
			payload
		};
	}

	static setPending() {
		return {
			type: ActionType.SET_PENDING
		};
	}
}
