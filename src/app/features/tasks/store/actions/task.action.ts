import { BasicActionTypes, entityRepresentationMap, makeBasicActions, makeBasicActionTypes } from '~entity';

// Extending action constants with specific ones
export interface TaskActionTypes extends BasicActionTypes {
}
// keeping capitalization for backward compatibility
// Generating Action types constants wrapped inside one object
export const ActionType: TaskActionTypes = makeBasicActionTypes(entityRepresentationMap.tasks);
export const TaskActions = makeBasicActions(ActionType);
entityRepresentationMap.tasks.actions = TaskActions;
