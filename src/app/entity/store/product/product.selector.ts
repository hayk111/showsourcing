import { createSelector } from 'reselect';
import { selectEntities } from '~entity/store/entity.selector';

import { selectProductStatuses } from '../product-status';
import { Product } from './product.model';

const selectCurrentTargetId = state => state.foccussedEntity.currentTarget.entityId;

export const selectProductsState = createSelector(selectEntities, (state: any) => state.product);
export const selectProductsMap = createSelector(selectProductsState, (state: any) => state.byId);
export const selectProducts = createSelector(selectProductsState, (state: any) => Object.values(state.byId));


export const selectProductById = (id: string) => {
	return createSelector([selectProductsMap], products => products[id]);
};

// select the currently focussed product
export const selectProductFocused = createSelector([selectProductsState], (state) => state.byId[state.focussed]);



// used in kanban (as it was changed without being tested, it could be not working)
export const selectProductByStatus = () =>
	createSelector(
		[selectProducts, selectProductStatuses],
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
