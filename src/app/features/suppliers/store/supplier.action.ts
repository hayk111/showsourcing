import { BasicActions, BasicActionTypes, ERM, makeBasicActionTypes } from '~entity';
import { TypedAction } from '~utils';

export const supplierActionTypes = {
	...makeBasicActionTypes(ERM.suppliers),
	LOAD_PRODUCT_COUNT: `[${ERM.suppliers.entityName.capitalize()}] Loading product count...`,
	ADD_PRODUCT_COUNT: `[${ERM.suppliers.entityName.capitalize()}] Setting product count...`,
};

class SupplierActions extends BasicActions {
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

ERM.suppliers.actions = SupplierActions;
