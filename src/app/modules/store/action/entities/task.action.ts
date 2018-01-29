import { FilterGroupName } from '../../model/misc/filter.model';
import { Task } from '../../model/entities/task.model';

export enum ActionType {
	LOAD = '[Task] loading',
	ADD = '[Task] adding',
	SET_PENDING = '[Task] setting pending',
 	CREATE = '[Task] creating',
	DELETE = '[Task] deleting'
}

export class TaskActions {

	static load(filterGroupName?: FilterGroupName) {
		return {
			type: ActionType.LOAD,
			payload: filterGroupName
		};
	}

	static add(tasks: Array<Task>) {
		return {
			type: ActionType.ADD,
			payload: tasks
		};
	}

	static setPending() {
		return {
			type: ActionType.SET_PENDING
		};
	}

}
