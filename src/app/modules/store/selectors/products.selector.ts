import { createSelector } from 'reselect';


export const selectProducts = state => state.entities.products;

export const selectProductById = (id: string) => {
	return createSelector([selectProducts], (products) => products.byId[id]);
};

