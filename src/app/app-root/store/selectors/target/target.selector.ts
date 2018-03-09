import { createSelector } from 'reselect';
import { entityStateToArray } from '~store/utils';

import { Vote } from '../../model/entities/vote.model';

export const selectCurrentTarget = state => state.foccussedEntity.currentTarget;

export const selectTasksForCurrentTarget = state => state.foccussedEntity.tasks;
export const selectTaskArrayForCurrentTarget = createSelector(
	[selectTasksForCurrentTarget],
	filesState => {
		return entityStateToArray(filesState);
	}
);

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

export const selectVotesForCurrentTarget = state => state.foccussedEntity.votes;
export const selectVotesArrayForCurrentTarget = createSelector(
	[selectVotesForCurrentTarget],
	voteState => {
		return entityStateToArray(voteState);
	}
);

export interface VoteByType {
	positive: Array<Vote>;
	negative: Array<Vote>;
	neutral: Array<Vote>;
	total: number;
}

export const selectVotesByType = createSelector([selectVotesArrayForCurrentTarget], votesArray => {
	const votes = {
		positive: [],
		neutral: [],
		negative: [],
		total: votesArray.length,
	};
	votesArray.forEach((v: Vote) => {
		switch (v.value) {
			case 100:
				votes.positive.push(v);
				break;
			case 0:
				votes.negative.push(v);
				break;
			default:
				votes.neutral.push(v);
				break;
		}
	});
	return votes;
});
