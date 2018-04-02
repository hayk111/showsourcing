import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM } from '../entity.model';


export const taskStatusActionTypes = makeEntityActionTypes(ERM.taskStatus.entityName);
export const taskStatusActions = new EntityActions(taskStatusActionTypes);
