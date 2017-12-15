import { EntityTarget } from '../utils/entities.utils';
import { selectTeamMembers } from './team-members.selector';
import { AppComment } from '../model/comment.model';
import { User } from '../model/user.model';
import { createSelector } from 'reselect';



export const selectComments = state => state.entities.comments;

export const selectCommentsForTarget = (target: EntityTarget) => {
	return createSelector(
		[ selectComments ],
		(comments: Array<AppComment>) => {
			return comments.filter(c => c.target.entityId === target.entityId);
		}
	);
};

