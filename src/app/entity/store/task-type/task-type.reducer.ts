import { entityReducerFactory } from '~entity/store/entity.reducer.factory';
import { taskTypeActionTypes } from './task-type.action';

export const taskTypeReducer = entityReducerFactory(taskTypeActionTypes);
