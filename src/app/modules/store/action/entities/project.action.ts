import { EntityTarget } from '../../utils/entities.utils';
import { Project } from '../../model/entities/project.model';



export enum ActionType {
	LOAD = '[Project] Loading...',
	CREATE = '[Project] Creating new',
	ADD = '[Project] Adding',
	REPLACE = '[Project] Replacing pending',
}

export class ProjectActions {

	static load(id, maxCounter) {
		return {
			type: ActionType.LOAD,
			payload: { id, maxCounter }
		};
	}

	static add(added: Array<Project>) {
		return {
			type: ActionType.ADD,
			payload: added
		};
	}

	static create(project: Project) {
		return {
			type: ActionType.CREATE,
			payload: project
		};
	}

	static replace(old: Project, replacing: Project) {
		return {
			type: ActionType.REPLACE,
			payload: { old, replacing }
		};
	}

}
