import { TypedAction } from '../../utils/typed-action.interface';
import { Project } from '../../model/entities/project.model';

export enum ActionType {
	LOAD = '[Project] Loading',
	ADD = '[Project] Adding',
	CREATE = '[Project] Create',
	PATCH = '[Project] patching',
	DELETE = '[Project] deleting',
}

export class ProjectActions {

	static load(id: string, maxCounter: number) {
		return {
			type: ActionType.LOAD,
			payload: { id, maxCounter }
		};
	}

	static  create(project: Project) {
		return {
			type: ActionType.CREATE,
			payload: project
		};
	}

	static add(payload: Array<Project>): TypedAction<Array<Project>> {
		return {
		type: ActionType.ADD,
			payload
		};
	}

	static patch(id: string, propName: string, value: any) {
		return {
			type: ActionType.PATCH,
			payload: { id, propName, value }
		};
	}

	static delete(id: string) {
		return {
			type: ActionType.DELETE,
			payload: id
		};
	}

}
