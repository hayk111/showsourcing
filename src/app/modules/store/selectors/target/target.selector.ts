import { createSelector } from 'reselect';
import { EntityTarget, EntityState, entityStateToArray } from '../../utils/entities.utils';
import { Vote } from '../../model/entities/vote.model';

import { Product, selectProducts } from '../../../products';

export const selectCurrentTarget = state => state.selection.currentSelection.target;

// we only need arrays here
export const selectFilesForCurrentTarget = state => state.selection.files;
export const selectFilesArrayForCurrentTarget = createSelector([selectFilesForCurrentTarget], filesState => {
	return entityStateToArray(filesState);
});

export const selectTasksForCurrentTarget = state => state.selection.tasks;
export const selectTaskArrayForCurrentTarget = createSelector([selectTasksForCurrentTarget], filesState => {
	return entityStateToArray(filesState);
});
export const selectNumTasksForSelection = createSelector(
	[selectTaskArrayForCurrentTarget],
	(tasks: Array<any>) => {
		return tasks.length;
	}
);

export const selectProjectsForCurrentTarget = state => state.selection.projects;
export const selectProjectsArrayForCurrentTarget = createSelector(
	[selectProjectsForCurrentTarget],
	filesState => {
		return entityStateToArray(filesState);
	}
);

export const selectImagesForCurrentTarget = state => state.selection.images;
export const selectImagesArrayForCurrentTarget = createSelector(
	[selectImagesForCurrentTarget],
	imageState => {
		return entityStateToArray(imageState);
	}
);

export const selectTagsForCurrentTarget = state => state.selection.tags;
export const selectTagsArrayForCurrentTarget = createSelector([selectTagsForCurrentTarget], tagState => {
	return entityStateToArray(tagState);
});

export const selectCommentsForCurrentTarget = state => state.selection.comments;
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

export const selectVotesForCurrentTarget = state => state.selection.votes;
export const selectVotesArrayForCurrentTarget = createSelector([selectVotesForCurrentTarget], voteState => {
	return entityStateToArray(voteState);
});

export const selectProductSelected = createSelector(
	[selectProducts, selectCurrentTarget],
	(productState: EntityState<Product>, selection: EntityTarget) => {
		if (!selection) return undefined;
		return productState.byId[selection.entityId];
	}
);

export interface VoteByType {
	positive: Array<Vote>;
	negative: Array<Vote>;
	neutral: Array<Vote>;
	total: number;
}

export const selectVotesByType = createSelector([selectVotesArrayForCurrentTarget], votesArray => {
	const votes = { positive: [], neutral: [], negative: [], total: votesArray.length };
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
