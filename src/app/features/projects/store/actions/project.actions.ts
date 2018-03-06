import {
	BasicActionTypes,
	BasicActions,
	ERM,
	makeBasicActions,
	makeBasicActionTypes,
} from '~entity';
import { TypedAction } from '~utils';

// Extending action constants with specific ones
export interface ProjectActionTypes extends BasicActionTypes {}
export const ProjectsActionType: ProjectActionTypes = makeBasicActionTypes(
	ERM.projects
);

export interface ProjectActions extends BasicActions {}
export const ProjectActions: ProjectActions = makeBasicActions(
	ProjectsActionType
);
ERM.suppliers.actions = ProjectActions;
