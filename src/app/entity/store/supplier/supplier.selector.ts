import { createSelector } from 'reselect';
import { entityStateToArray } from '~entity/utils';

import { selectEntities } from '../entity.selector';


export const selectSupplierState = createSelector([selectEntities], state => {
	return state.supplier;
});

export const selectSuppliers = createSelector([selectSupplierState], state => entityStateToArray(state));
export const selectSupplierFocussed = createSelector(
	[selectSupplierState],
	state => state.byId[state.focussed]
);

export const selectSupplierProductsCountForFocussed = id =>
	createSelector([selectSupplierState], state => {
		if (!state.productsCount) {
			return 0;
		} else {
			return state.productsCount[state.focussed] || 0;
		}
	});
