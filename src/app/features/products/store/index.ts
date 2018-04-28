import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromNewProductDlg from './new-product-dlg/new-product-dlg.reducer';
import { selectEntityState, EntityState, fromCountry, fromTeamMember, fromProductStatus } from '~app/entity';

import * as fromProduct from './product';
export * from './product';

// defining the state
export interface ProductState {
	product: fromProduct.State;
	newProductDlg: fromNewProductDlg.State;
}

export const reducers: ActionReducerMap<ProductState> = {
	newProductDlg: fromNewProductDlg.reducer,
	product: fromProduct.reducer
};

// feature selector
export const selectProductFeature = createFeatureSelector<ProductState>('product');

// products
export const selectProductState = createSelector(
	selectProductFeature,
	(state: ProductState) => state.product
);

export const selectProductArray = createSelector(
	selectProductState,
	fromProduct.selectArray,
);

export const selectOneProduct = (id: string) => createSelector(
	selectProductState,
	fromProduct.selectOne(id)
);

export const selectFocusedProduct = createSelector(
	selectProductState,
	fromProduct.selectFocused
);

export const selectProductByStatus = createSelector(
	selectProductArray,
	fromProductStatus.selectArray,
	fromProduct.selectByStatus
);

// new product dialog
export const selectNewProductDlg = createSelector(
	selectProductFeature,
	(state: ProductState) => state.newProductDlg
);


