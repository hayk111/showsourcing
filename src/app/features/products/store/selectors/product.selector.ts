import { createSelector } from 'reselect';
import { EntityState } from '~entity';
import { Filter, FilterGroupName, selectFilterGroup } from '~shared/filters';
import { selectProductStatuses } from '~store/selectors/entities/product-status.selector';
import { deepCopy } from '~utils';

import { Product } from '../../models/product.model';
import { EntitiesState, ProductsState } from './../reducers';

export const getEntitiesState = state => state.entities;
const selectCurrentTargetId = state =>
	state.foccussedEntity.currentTarget.entityId;

export const selectProductsState = createSelector(
	getEntitiesState,
	(state: EntitiesState) => state.products
);
export const selectProducts = createSelector(
	selectProductsState,
	(state: ProductsState) => state.byId
);

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
	return createSelector(
		[selectFilterGroup(filterGroupName), selectProducts],
		(filters, products) => {
			const filteredProducts = Object.keys(products)
				.map(id => products[id])
				.reduce((returned, product) => {
					if (filters.every((afilter: Filter) => afilter.filter(product))) {
						returned.push(product);
					}
					return returned;
				}, []);
			return filteredProducts;
		}
	);
};

export const selectProductByStatus = (filterGroupName: FilterGroupName) =>
	createSelector(
		[selectFilteredEntity(filterGroupName), selectProductStatuses],
		(products: Array<Product>, statuses: EntityState<any>) => {
			// get a copy of status so we can add products for each status
			const statusAndProds = deepCopy(statuses.byId);
			Object.values(statusAndProds).forEach(s => (s.products = []));

			products.forEach(product => {
				// add empty array of products
				// find the correct status
				const status4Prod = statusAndProds[product.status];
				if (status4Prod) status4Prod.products.push(product);
			});
			return Object.values(statusAndProds);
		}
	);
