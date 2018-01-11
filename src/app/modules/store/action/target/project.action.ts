import { EntityTarget } from '../../utils/entities.utils';
import { Project } from '../../model/project.model';


export enum ActionType {
	LOAD = '[Target-Project] loading',
	SET = '[Target-Project] setting',
	ADD = '[Target-Project] adding',
	REMOVE = '[Target-Project] removing'
}

export class TargetProjectActions {

	static load(target: EntityTarget) {
		return {
			type: ActionType.LOAD,
			payload: target
		};
	}
	// we are setting only ids here.
	static set(projectsIds: Array<string>) {
		return {
			type: ActionType.SET,
			payload: projectsIds
		};
	}

	static add(project: Project, target: EntityTarget) {
		return {
			type: ActionType.ADD,
			payload: { project, target }
		};
	}

	static remove(project: Project, target: EntityTarget) {
		return {
			type: ActionType.REMOVE,
			payload: { project, target }
		};
	}
}
