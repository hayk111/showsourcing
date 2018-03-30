import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM } from '../entity.model';


export const taskStatusActionTypes = makeEntityActionTypes(ERM.taskStatus);
export const taskStatusActions = new EntityActions(taskStatusActionTypes);
