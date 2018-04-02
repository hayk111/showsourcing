import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM } from '../entity.model';

// Generating Action types constants wrapped inside one object
export const fileActionType: EntityActionTypes = makeEntityActionTypes(ERM.file.entityName);
export const fileActions = new EntityActions(fileActionType);
