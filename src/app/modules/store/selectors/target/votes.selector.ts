import { createSelector } from 'reselect';
import { EntityTarget } from '../../utils/entities.utils';


export const selectVotes = state => state.target.votes;

export const selectVotesForTarget = (target: EntityTarget) => {
	return createSelector([selectVotes], votes => {
		return votes.filter(v => v.target.entityId === target.entityId );
	});
};

