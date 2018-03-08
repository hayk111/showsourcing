import { ActionReducerMap } from '@ngrx/store';
import { EntityState } from '~entity';
import { entityInitialState } from '~entity/models/entities.model';
import { ProjectsActionTypes } from '~projects/store/actions/project.actions';
import { basicReducerFactory } from '~store';
import { TypedAction } from '~utils/typed-action.interface';

import { Product } from '../models/product.model';
import { ProductActionTypes } from './product.action';

// ----------------------------------------------------------------------------
// --------------------------- Defining Product State
// ----------------------------------------------------------------------------
export interface ProductsState extends EntityState<Product> {}
export interface EntitiesState {
	products: ProductsState;
}

// ----------------------------------------------------------------------------
// --------------------------- Constructing basic reducer + extended reducer
// ----------------------------------------------------------------------------
export const basicProductReducer = basicReducerFactory(ProductActionTypes);

export function productReducer(
	state = entityInitialState,
	action: TypedAction<any>
) {
	switch (action.type) {
		case ProjectsActionTypes.ADD_PRODUCTS_SUCCESS:
			const byId = { ...state.byId };
			action.payload.forEach(element => {
				const product: Product = { ...byId[element.productId] };
				if (!product.projectIds.includes(element.projectId)) {
					product.projectIds = [...product.projectIds, element.projectId];
				}
				byId[product.id] = product;
			});
			return { ...state, byId };
		default:
			return basicProductReducer(state, action);
	}
}
