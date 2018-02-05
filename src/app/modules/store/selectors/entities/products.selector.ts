import { createSelector } from 'reselect';
import { selectProductStatuses } from './product-status.selector';
import { selectCategories } from './categories.selector';
import { selectEvents } from './events.selector';
import { selectSuppliers } from './suppliers.selector';
import { entityRepresentationMap, EntityState } from '../../utils/entities.utils';
import { Product } from '../../model/entities/product.model';
import { deepCopy } from '../../utils/deep-copy.utils';
import { FilterGroupName } from '../../model/misc/filter.model';
import { selectFilteredEntity } from '../misc/filter.selectors';


export const selectProducts = state => state.entities.products;

export const selectProductById = (id: string) => {
	return createSelector(
		[
			selectProducts
		],
		(products) => {
			return products.byId[id];
		});
};


export const selectProductByStatus = (filterGroupName: FilterGroupName) => createSelector(
	[
		selectFilteredEntity(filterGroupName, entityRepresentationMap.product),
		selectProductStatuses
	],
	(products: Array<Product>, statuses: EntityState<any>) => {
		// get a copy of status so we can add products for each status
		const statusAndProds = deepCopy(statuses.byId);
		Object.values(statusAndProds).forEach(s => s.products = []);

		products.forEach(product => {
			// add empty array of products
			// find the correct status
			const status4Prod = statusAndProds[product.status];
			if (status4Prod)
				status4Prod.products.push(product);
		});
		return Object.values(statusAndProds);
	}
);


export const selectProductsWithNames = createSelector(
	[
		selectProducts,
		selectCategories,
		selectEvents,
		selectSuppliers
	],
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


