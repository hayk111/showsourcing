import { Project } from '../../model/entities/project.model';

export enum ActionType {
	LOAD = '[ProjectsSelection] loading',
	SET = '[ProjectsSelection] setting',
	ADD = '[ProjectsSelection] adding',
	REMOVE = '[ProjectsSelection] removing for selection',
}

export class ProjectSlctnActions {
	static load() {
		return {
			type: ActionType.LOAD
		};
	}

	static set(projects: Array<Project>) {
		return {
			type: ActionType.SET,
			payload: projects
		};
	}

	static add(project: Project) {
		return {
			type: ActionType.ADD,
			payload: project
		};
	}

	static remove(project: Project) {
		return {
			type: ActionType.REMOVE,
			payload: project
		};
	}
}
