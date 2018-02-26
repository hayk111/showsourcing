import { Project } from '~projects/models/project.model';

export enum ActionType {
	LOAD = '[ProjectsTarget] loading',
	SET = '[ProjectsTarget] setting',
	ADD = '[ProjectsTarget] adding',
	REMOVE = '[ProjectsTarget] removing for target',
}

export class ProjectTargetActions {
	static load() {
		return {
			type: ActionType.LOAD,
		};
	}

	static set(projects: Array<Project>) {
		return {
			type: ActionType.SET,
			payload: projects,
		};
	}

	static add(project: Project) {
		return {
			type: ActionType.ADD,
			payload: project,
		};
	}

	static remove(project: Project) {
		return {
			type: ActionType.REMOVE,
			payload: project,
		};
	}
}
