import { createSelector } from 'reselect';
import { entityStateToArray } from '~entity/utils';

import { selectEntities } from '../entity.selector';


export const selectSupplierState = createSelector([selectEntities], state => {
	return state.supplier;
});

export const selectSuppliers = createSelector([selectSupplierState], state => entityStateToArray(state));
export const selectSupplierSelected = createSelector(
	[selectSupplierState],
	state => state.byId[state.selected]
);

export const selectSupplierProductsCountForId = id =>
	createSelector([selectSupplierState], state => {
		if (!state.productsCount) {
			return 0;
		} else {
			return state.productsCount[state.selected] || 0;
		}
	});
