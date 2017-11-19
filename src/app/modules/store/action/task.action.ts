import { Action } from '@ngrx/store';
import { Task } from '../model/task.model';
import { TypedAction } from '../utils/typed-action.interface';

export enum ActionType {
		SET_TASKS = '[Task] setting',
		SET_PENDING = '[Task] pending'
}

export class TaskActions {
		static setTasks(payload: Array<Task>): TypedAction<Array<Task>> {
				return {
						type: ActionType.SET_TASKS,
						payload
				};
		}
}
