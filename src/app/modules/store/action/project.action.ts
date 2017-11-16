import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';
import { Project } from '../model/project.model';

export enum ActionType {
		SET_PROJECTS = '[Project] setting',
}

export class ProjectActions {
		static setProjects(payload: Array<Project>): TypedAction<Array<Project>> {
				return {
						type: ActionType.SET_PROJECTS,
						payload
				};
		}

}
