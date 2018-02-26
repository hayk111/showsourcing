import { makeBasicActionTypes, makeBasicActions, BasicActionTypes } from '~store/action/entities/_entity.action.factory';
import { entityRepresentationMap } from '~store';

// Extending action constants with specific ones
export interface ProjectActionTypes extends BasicActionTypes {
}
// keeping capitalization for backward compatibility
// Generating Action types constants wrapped inside one object
export const ActionType: ProjectActionTypes = makeBasicActionTypes(entityRepresentationMap.projects);
export const ProjectActions = makeBasicActions(ActionType);
entityRepresentationMap.suppliers.actions = ProjectActions;
