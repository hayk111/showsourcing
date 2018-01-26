
import { createSelector } from 'reselect';
import { EntityTarget } from '../../utils/entities.utils';
import { AppComment } from '../../model/entities/comment.model';



export const selectComments = state => state.target.comments;

export const selectCommentsForTarget = (target: EntityTarget) => {
	return createSelector(
		[ selectComments ],
		(comments: Array<AppComment>) => {
			return comments.filter(c => c.target.entityId === target.entityId);
		}
	);
};

