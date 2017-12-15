import { EntityTarget } from '../utils/entities.utils';
import { createSelector } from 'reselect';


export const selectVotes = state => state.entities.votes;

export const selectVotesForTarget = (target: EntityTarget) => {
	return createSelector([selectVotes], votes => {
		return votes.filter(v => v.target.entityId === target.entityId );
	});
};

