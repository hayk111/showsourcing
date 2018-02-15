import { Tag } from '../../model/entities/tag.model';
import { Task } from '../../model/entities/task.model';

export enum ActionType {
	LOAD = '[TaskSelection] loading',
	SET = '[TaskSelection] setting',
	ADD = '[TaskSelection] adding',
	REMOVE = '[TaskSelection] removing for selection',
	RESET = '[TaskSelection] resetting',
	REPLACE = '[TaskSelection] replacing'
}

export class TaskSlctnActions {
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
