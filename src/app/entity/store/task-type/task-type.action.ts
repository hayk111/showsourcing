import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM } from '../entity.model';

export const taskTypeActionTypes = makeEntityActionTypes(ERM.taskTypes);
export const taskTypeActions = new EntityActions(taskTypeActionTypes);
