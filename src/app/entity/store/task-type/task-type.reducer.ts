import { basicReducerFactory } from '~app/shared/entity/store/entity.reducer.factory';
import { taskTypeActionTypes } from './task-type.action';

export const taskTypeReducer = basicReducerFactory(taskTypeActionTypes);
