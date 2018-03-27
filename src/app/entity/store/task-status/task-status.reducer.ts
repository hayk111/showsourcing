import { basicReducerFactory } from '~app/shared/entity/store/entity.reducer.factory';
import { taskStatusActionTypes } from '~app/features/tasks/store/task-status/task-status.action';

export const taskStatusReducer = basicReducerFactory(taskStatusActionTypes);
