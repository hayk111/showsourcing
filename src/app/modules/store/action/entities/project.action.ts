import { Action } from '@ngrx/store';
import { Project } from '../../model/entities/project.model';

export enum ActionType {
	LOAD = '[Project] Loading...',
	ADD = '[Project] Adding',
	CREATE = '[Project] Creating new',
	REPLACE = '[Project] Replacing pending',
}

export class ProjectActions {

	static load(id: string, maxCounter: number) {
		return {
			type: ActionType.LOAD,
			payload: { id, maxCounter }
		};
	}

	static add(payload: Array<Project>){
		return {
		type: ActionType.ADD,
			payload
		};
	}

	static create(projects: Array<Project>) {
		return {
			type: ActionType.CREATE,
			payload: projects
		};
	}

	static replace(id: string, replacing: Project) {
		return {
			type: ActionType.REPLACE,
			payload: { id, replacing }
		};
	}

}
