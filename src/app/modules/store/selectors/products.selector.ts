import { createSelector } from 'reselect';


export const selectProducts = state => state.products;

export const selectProductById = (id: string) => {
	return createSelector([selectProducts], (products) => products.byId[id]);
};

