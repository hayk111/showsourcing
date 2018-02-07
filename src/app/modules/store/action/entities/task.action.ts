import { FilterGroupName } from '../../model/misc/filter.model';
import { Task } from '../../model/entities/task.model';
import { makeBasicActionTypes, makeBasicActions } from './_entity.action.factory';
import { entityRepresentationMap } from '../../utils/entities.utils';

// keeping capitalization for backward compatibility
export const ActionType = makeBasicActionTypes(entityRepresentationMap.tasks);
export const TaskActions = makeBasicActions(ActionType);
entityRepresentationMap.tasks.actions = TaskActions;
