import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM } from '../entity.model';

export const taskTypeActionTypes = makeEntityActionTypes(ERM.taskType);
export const taskTypeActions = new EntityActions(taskTypeActionTypes);