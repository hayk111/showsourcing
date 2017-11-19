import { Action } from '@ngrx/store';
import { Task } from '../model/task.model';
import { TypedAction } from '../utils/typed-action.interface';

export enum ActionType {
		SET_DATA = '[Task] setting',
		SET_PENDING = '[Task] pending'
}

export class TaskActions {
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
}
