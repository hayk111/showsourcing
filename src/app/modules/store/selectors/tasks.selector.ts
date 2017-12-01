import { createSelector } from 'reselect';


export const selectTasks = state => state.entities.tasks;

export const selectTaskById = (id: string) => {
	return createSelector([selectTasks], tasks => tasks.byId[id]);
};

