import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';
import { Project } from '../model/project.model';

export enum ActionType {
	LOAD = '[Project] Loading',
	ADD_PROJECTS = '[Project] Adding',
	ADD_NEW = '[Projects] Adding new',
	SET_READY = '[Projects] setting ready'
}

export class ProjectActions {

	static load(id: string, maxCounter: number) {
		return {
			type: ActionType.LOAD,
			payload: { id, maxCounter }
		};
	}

	static addProjects(payload: Array<Project>): TypedAction<Array<Project>> {
		return {
		type: ActionType.ADD_PROJECTS,
			payload
		};
	}

	static addNewProject(project: Project) {
		return {
			type: ActionType.ADD_NEW,
			payload: project
		};
	}

	static setReady(project: Project) {
		return {
			type: ActionType.SET_READY,
			payload: project
		};
	}

}
