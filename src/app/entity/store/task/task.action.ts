import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM } from '../entity.model';

// Generating Action types constants wrapped inside one object
export const taskActionType: EntityActionTypes = makeEntityActionTypes(ERM.tasks);
export const taskActions = new EntityActions(taskActionType);
