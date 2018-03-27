import { entityStateToArray } from '../../utils';
import { createSelector } from 'reselect';

export const selectProductStatusesState = state => state.entities.productStatus;

export const selectProductStatuses = createSelector([selectProductStatusesState], state =>
	entityStateToArray(state)
);
