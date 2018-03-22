import { BasicActionTypes, ERM, makeBasicActionTypes, BasicActions } from '~entity';

// Generating Action types constants wrapped inside one object
export const ActionType: BasicActionTypes = makeBasicActionTypes(ERM.tasks);
export const TaskActions = new BasicActions(ActionType);
