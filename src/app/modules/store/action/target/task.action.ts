import { Task } from '../../model/entities/task.model';

export enum ActionType {
	LOAD = '[TaskTarget] loading',
	SET = '[TaskTarget] setting',
	ADD = '[TaskTarget] adding',
	REMOVE = '[TaskTarget] removing for target',
	RESET = '[TaskTarget] resetting',
	REPLACE = '[TaskTarget] replacing'
}

export class TaskTargetActions {
	static load() {
		return {
			type: ActionType.LOAD
		};
	}

	static set(tasks: Array<Task>) {
		return {
			type: ActionType.SET,
			payload: tasks
		};
	}

	static add(task: Task) {
		return {
			type: ActionType.ADD,
			payload: task
		};
	}

	static remove(task: Task) {
		return {
			type: ActionType.REMOVE,
			payload: task
		};
	}

	static replace(old: Task, replacing: Task) {
		return {
			type: ActionType.REPLACE,
			payload: { old, replacing }
		};
	}
}
