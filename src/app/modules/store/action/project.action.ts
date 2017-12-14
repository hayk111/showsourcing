import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';
import { Project } from '../model/project.model';

export enum ActionType {
	LOAD = '[Project] Loading',
	SET_PROJECTS = '[Project] Setting',
}

export class ProjectActions {

	static load(maxCounter) {
		return {
			type: ActionType.LOAD,
			payload: maxCounter
		};
	}

	static setProjects(payload: Array<Project>): TypedAction<Array<Project>> {
		return {
			type: ActionType.SET_PROJECTS,
			payload
		};
	}

}
