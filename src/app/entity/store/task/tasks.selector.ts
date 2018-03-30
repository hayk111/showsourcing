import { createSelector } from 'reselect';
import { entityStateToArray } from '../../utils';

export const selectTaskState = state => state.entities.task;
export const selectTasks = createSelector([selectTaskState], state => entityStateToArray(state));

export const selectTaskById = (id: string) => {
	return createSelector([selectTaskState], tasks => tasks.byId[id]);
};

