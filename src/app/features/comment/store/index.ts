import * as fromComment from './comment';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { entityStateToArray } from '~app/entity/utils/entity.utils';

export const selectCommentState = createFeatureSelector<fromComment.State>('comment');

export const selectCommentArray = createSelector(
	selectCommentState,
	(state: fromComment.State) => entityStateToArray(state)
);

export const selectCommentPending = createSelector(
	selectCommentState,
	(state: fromComment.State) => state.pending
);

