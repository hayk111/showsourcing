import { createSelector } from 'reselect';
import { entityStateToArray } from '~entity/utils';

import { Vote } from '../../model/entities/vote.model';

export const selectCurrentTarget = state => state.foccussedEntity.currentTarget;

export const selectTasksForCurrentTarget = state => state.foccussedEntity.tasks;
export const selectTaskArrayForCurrentTarget = createSelector([selectTasksForCurrentTarget], filesState => {
	return entityStateToArray(filesState);
});

export const selectNumTasksForSelection = createSelector(
	[selectTaskArrayForCurrentTarget],
	(tasks: Array<any>) => {
		return tasks.length;
	}
);

export const selectCommentsForCurrentTarget = state => state.foccussedEntity.comments;
export const selectCommentsArrayForCurrentTarget = createSelector(
	[selectCommentsForCurrentTarget],
	commentState => {
		return entityStateToArray(commentState);
	}
);

export const selectNumCommentsForCurrentTarget = createSelector(
	[selectCommentsArrayForCurrentTarget],
	(comments: Array<any>) => {
		return comments.length;
	}
);
