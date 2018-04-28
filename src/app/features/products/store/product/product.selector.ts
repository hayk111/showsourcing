import { createSelector } from '@ngrx/store';
import { entityStateToArray, fromProductStatus } from '~app/entity';

import { Product } from './product.model';
import { State } from './product.reducer';



export const selectArray = (state: State) => entityStateToArray(state);

export const selectById = (state: State) => state.byId;

export const selectOne = (id: string) => (state: State) => state.byId[id];

// select the currently focussed product
export const selectFocused = (state: State) => state.byId[state.focussed];

// used in kanban (as it was changed without being tested, it could be not working)
export const selectByStatus = (products: Array<Product>, statuses: Array<any>) => {
	// since we need to keep order we need to receive the statuses as params to have the correct order
	// creating a new object for each status with just the name and an empty array of products
	const returned: any = statuses.map(status => ({ name: status.name, products: [] }));

	products.forEach(product => {
		// add empty array of products
		// find the correct status
		const status4Prod = returned[product.status];
		if (status4Prod)
			status4Prod.products.push(product);
	});
	return returned;
};
