import { ProjectsActionTypes } from '~projects/store/actions/project.actions';
import { entityInitialState } from '~entity/models/entities.model';
import { basicReducerFactory } from '~store';
import { TypedAction } from '~utils/typed-action.interface';

import { ProductActionTypes } from '../actions/product.action';
import { Product } from '~app/features/products';

export const basicProductReducer = basicReducerFactory(ProductActionTypes);

export function productReducer(
	state = entityInitialState,
	action: TypedAction<any>
) {
	switch (action.type) {
		case ProjectsActionTypes.ADD_PRODUCTS_SUCCESS:
			const byId = { ...state.byId };
			action.payload.forEach(element => {
				const product: Product = { ...state.byId[element.productId] };
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
