import { createSelector } from 'reselect';
import { entityStateToArray } from '~entity/utils';

export const selectComments = state => state.entities.comment;

export const selectNumComments = createSelector([selectComments], (comment: Array<any>) => {
	return comment.length;
});
