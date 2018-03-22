import { createSelector } from 'reselect';
import { EntityState } from '~entity';
import { Filter, FilterGroupName, selectFilterGroup } from '~shared/filters';
import {
	selectProductStatuses,
	selectProductStatusesState,
} from '~store/selectors/entities/product-status.selector';
import { deepCopy } from '~utils';

import { Product } from '../models/product.model';
import { EntitiesState, ProductsState } from './';

export const getEntitiesState = state => state.entities;
const selectCurrentTargetId = state => state.foccussedEntity.currentTarget.entityId;

export const selectProductsState = createSelector(getEntitiesState, (state: EntitiesState) => state.products);
export const selectProducts = createSelector(selectProductsState, (state: ProductsState) => state.byId);

export const selectProductById = (id: string) => {
	return createSelector([selectProducts], products => {
		return products[id];
	});
};

// select the currently focCCCcussed product
export const selectProductFocused = createSelector(
	[selectProductsState, selectCurrentTargetId],
	(productState: EntityState<Product>, id: string) => {
		if (!id) return undefined;
		return productState.byId[id];
	}
);

export const selectFilteredEntity = (filterGroupName: FilterGroupName) => {
	return createSelector([selectFilterGroup(filterGroupName), selectProducts], (filters, products) => {
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
			let returned: any = statuses.map(status => ({ name: status.name }));
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
