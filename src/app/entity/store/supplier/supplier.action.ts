import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM } from '../entity.model';
import { TypedAction } from '~utils';

export const supplierActionTypes = {
	...makeEntityActionTypes(ERM.supplier),
	LOAD_PRODUCT_COUNT: `[${ERM.supplier.entityName.capitalize()}] Loading product count...`,
	ADD_PRODUCT_COUNT: `[${ERM.supplier.entityName.capitalize()}] Setting product count...`,
};

class SupplierActions extends EntityActions {
	// additional actions / extensions of the base
	loadProductCount() {
		return {
			type: this.actionType.LOAD_PRODUCT_COUNT,
		};
	}

	addProductCount(countObject: { [key: string]: number }) {
		return {
			type: this.actionType.ADD_PRODUCT_COUNT,
			payload: countObject,
		};
	}
}

export const supplierActions = new SupplierActions(supplierActionTypes);

ERM.supplier.actions = SupplierActions;
