import { BasicActionTypes, ERM, makeBasicActionTypes, BasicActions } from '~entity';

// Generating Action types constants wrapped inside one object
export const actionType: BasicActionTypes = makeBasicActionTypes(ERM.tasks);
export const taskActions = new BasicActions(actionType);
