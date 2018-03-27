import { entityReducerFactory } from '~entity/store/entity.reducer.factory';
import { taskStatusActionTypes } from './task-status.action';

export const taskStatusReducer = entityReducerFactory(taskStatusActionTypes);
