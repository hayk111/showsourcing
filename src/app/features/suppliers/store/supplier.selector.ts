import { createSelector } from '@ngrx/store';
import { entityStateToArray } from '~app/shared/entity';

export const getEntitiesState = state => state.entities;

export const selectSupplierState = createSelector([getEntitiesState], state => {
	return state.suppliers;
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
			return state.productsCount[state.selected];
		}
	});
