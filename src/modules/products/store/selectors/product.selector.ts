import { createSelector } from 'reselect';
import { Filter, FilterGroupName } from '~store/model/misc/filter.model';
import { selectCategories } from '~store/selectors/entities/categories.selector';
import { selectEvents } from '~store/selectors/entities/events.selector';
import { selectProductStatuses } from '~store/selectors/entities/product-status.selector';
import { selectFilterGroup } from '~store/selectors/misc/filter.selectors';
import { deepCopy } from '~store/utils/deep-copy.utils';
import { EntityState } from '~store/utils/entities.utils';
import { selectSuppliers } from '~suppliers/store/selectors/suppliers.selector';

import { Product } from '../../models/product.model';
import { EntitiesState } from './../reducers';
import { ProductState } from './../reducers/product.reducer';

export const getEntitiesState = state => state.entities;
const selectCurrentTargetId = state => state.foccussedEntity.currentTarget.entityId;

export const selectProducts = createSelector(getEntitiesState, (state: EntitiesState) => state.products);
export const selectProductsObj = createSelector(selectProducts, (state: ProductState) => state.byId);

export const selectProductById = (id: string) => {
	return createSelector([selectProducts], products => {
		return products.byId[id];
	});
};

export const selectProductFocused = createSelector(
	[selectProducts, selectCurrentTargetId],
	(productState: EntityState<Product>, id: string) => {
		if (!id) return undefined;
		return productState.byId[id];
	}
);

export const selectFilteredEntity = (filterGroupName: FilterGroupName) => {
	return createSelector([selectFilterGroup(filterGroupName), selectProductsObj], (filters, products) => {
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

export const selectProductsWithNames = createSelector(
	[selectProducts, selectCategories, selectEvents, selectSuppliers],
	(products, categories, events, suppliers) => {
		const returned = [];
		products = deepCopy(products);
		products.ids.forEach(id => {
			const product = products.byId[id];
			const supplier = suppliers.byId[product.supplierId];
			const event = events.byId[product.eventId];
			const category = categories.byId[product.category.id];
			product.supplierName = supplier ? supplier.name : '';
			product.eventName = event ? event.name : '';
			product.categoryName = category ? category.name : '';
			returned.push(product);
		});
		return returned;
	}
);
