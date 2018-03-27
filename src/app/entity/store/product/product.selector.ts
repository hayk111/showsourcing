import { createSelector } from 'reselect';
import { selectEntities } from '~app/entity';
import { Filter, FilterGroupName, selectFilterGroup } from '~shared/filters';

import { selectProductStatuses } from '../product-status';
import { Product } from './product.model';

const selectCurrentTargetId = state => state.foccussedEntity.currentTarget.entityId;

export const selectProductsState = createSelector(selectEntities, (state: any) => state.products);
export const selectProductsMap = createSelector(selectProductsState, (state: any) => state.byId);
export const selectProducts = createSelector(selectProductsState, (state: any) => Object.values(state.byId));


export const selectProductById = (id: string) => {
	return createSelector([selectProductsMap], products => products[id]);
};

// select the currently focCCCcussed product
export const selectProductFocused = createSelector(
	[selectProductsMap, selectCurrentTargetId],
	(products: any, id: string) => {
		if (!id) return undefined;
		return products[id];
	}
);

export const selectFilteredEntity = (filterGroupName: FilterGroupName) => {
	return createSelector([selectFilterGroup(filterGroupName), selectProductsMap], (filters, products) => {
		const filteredProducts = Object.keys(products)
			.map(id => products[id])
			.reduce((returned, product) => {
				if (filters.every((afilter: Filter) => afilter.filter(product))) {
					returned.push(product);
				}
				return returned;
			}, []);
		return filteredProducts;
	});
};

// used in kanban (as it was changed without being tested, it could be not working)
export const selectProductByStatus = (filterGroupName: FilterGroupName) =>
	createSelector(
		[selectFilteredEntity(filterGroupName), selectProductStatuses],
		(products: Array<Product>, statuses: Array<any>) => {
			// creating a new object for each status with just the name
			const returned: any = statuses.map(status => ({ name: status.name }));
			// adding empty array of product for each
			returned.forEach(r => (r.products = []));

			products.forEach(product => {
				// add empty array of products
				// find the correct status
				const status4Prod = returned[product.status];
				if (status4Prod) status4Prod.products.push(product);
			});
			return Object.values(returned);
		}
	);
