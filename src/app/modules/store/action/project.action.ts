import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';
import { Project } from '../model/project.model';

export enum ActionType {
	LOAD = '[Project] Loading',
	ADD_PROJECTS = '[Project] Adding',
	PATCH = '[Project] patching'
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

	static patch(id: string, propName: string, value: any) {
		return {
			type: ActionType.PATCH,
			payload: { id, propName, value }
		};
	}

}
