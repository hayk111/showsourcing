import { Action } from '@ngrx/store';
import { Task } from '../model/task.model';
import { TypedAction } from '../utils/typed-action.interface';

export enum ActionType {
		SET_DATA = '[Task] setting',
		SET_PENDING = '[Task] pending',
		PATCH_PROPERTY = '[Task] patch'
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

		static patch(id: string, propName: string, value: any) {
			return {
				type: ActionType.PATCH_PROPERTY,
				payload: { id, propName, value }
			};
		}
}
