import { entityReducerFactory } from '../entity.reducer.factory';

import { taskActionType } from './task.action';

export const taskReducer = entityReducerFactory(taskActionType);
