import { Tag } from '../../model/entities/tag.model';
import { Task } from '../../model/entities/task.model';

export enum ActionType {
	LOAD = '[TaskSelection] loading',
	ADD = '[TaskSelection] adding',
	REMOVE_FOR_SELECTION = '[TaskSelection] removing for selection',
	RESET = '[TaskSelection] resetting',
}

export class TaskSlctnActions {
	static load() {
		return {
			type: ActionType.LOAD
		};
	}

	static add(tasks: Array<Task>) {
		return {
			type: ActionType.ADD,
			payload: tasks
		};
	}

	static reset() {
		return {
			type: ActionType.RESET
		};
	}

	static removeForSelection(task: Task) {
		return {
			type: ActionType.REMOVE_FOR_SELECTION,
			payload: task
		};
	}
}
