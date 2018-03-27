import { createSelector } from 'reselect';
import { entityStateToArray } from '~entity/utils';

export const selectComments = state => state.entities.comments;

export const selectNumComments = createSelector([selectComments], (comments: Array<any>) => {
	return comments.length;
});
