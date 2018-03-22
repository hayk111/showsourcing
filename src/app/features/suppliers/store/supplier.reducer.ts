import { SupplierActionType as ActionType, SupplierActionType } from './supplier.action';
import { basicReducerFactory } from '~store';
import { entityInitialState } from '~app/shared/entity';
import { TypedAction } from '~app/app-root/utils';

export const basicReducer = basicReducerFactory(ActionType);

export function supplierReducer(state = entityInitialState, action: TypedAction<any>) {
	switch (action.type) {
		case SupplierActionType.ADD_PRODUCT_COUNT:
			const countObj = action.payload;
			return { ...state, productsCount: countObj };

		default:
			return basicReducer(state, action);
	}
}
