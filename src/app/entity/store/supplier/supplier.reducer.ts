import { supplierActionTypes } from './supplier.action';
import { entityReducerFactory } from '../entity.reducer.factory';
import { entityInitialState } from '../entity.model';
import { TypedAction } from '~app/app-root/utils';

const basicReducer = entityReducerFactory(supplierActionTypes);

export function supplierReducer(state = entityInitialState, action: TypedAction<any>) {
	switch (action.type) {
		case supplierActionTypes.ADD_PRODUCT_COUNT:
			const countObj = action.payload;
			return { ...state, productsCount: countObj };

		default:
			return basicReducer(state, action);
	}
}
