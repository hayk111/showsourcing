import { BasicActionTypes, ERM, makeBasicActions, makeBasicActionTypes } from '~entity';

// Extending action constants with specific ones
export interface ProjectActionTypes extends BasicActionTypes {
}
// keeping capitalization for backward compatibility
// Generating Action types constants wrapped inside one object
export const ActionType: ProjectActionTypes = makeBasicActionTypes(ERM.projects);
export const ProjectActions = makeBasicActions(ActionType);
ERM.suppliers.actions = ProjectActions;
