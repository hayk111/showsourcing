import { Project } from '../../model/entities/project.model';

export enum ActionType {
	LOAD = '[ProjectsSelection] loading',
	ADD = '[ProjectsSelection] adding',
	REMOVE_FOR_SELECTION = '[ProjectsSelection] removing for selection',
	RESET = '[ProjectsSelection] resetting',
}

export class ProjectSlctnActions {
	static load() {
		return {
			type: ActionType.LOAD
		};
	}

	static add(projects: Array<Project>) {
		return {
			type: ActionType.ADD,
			payload: projects
		};
	}


	static reset() {
		return {
			type: ActionType.RESET
		};
	}

	static removeForSelection(project: Project) {
		return {
			type: ActionType.REMOVE_FOR_SELECTION,
			payload: project
		};
	}
}
