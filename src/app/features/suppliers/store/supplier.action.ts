import {
	addActionType,
	BasicActions,
	BasicActionTypes,
	ERM,
	makeBasicActions,
	makeBasicActionTypes,
} from '~entity';
import { TypedAction } from '~utils';

// ----------------------------------------------------------------------------
// --------------------------- Constructing basic actions type + extended types
// ----------------------------------------------------------------------------
export interface SupplierActionType extends BasicActionTypes {
	LOAD_PRODUCT_COUNT?: string;
	ADD_PRODUCT_COUNT?: string;
}

export const SupplierActionType: SupplierActionType = makeBasicActionTypes(ERM.suppliers);
addActionType(SupplierActionType, ERM.suppliers, 'LOAD_PRODUCT_COUNT');
addActionType(SupplierActionType, ERM.suppliers, 'ADD_PRODUCT_COUNT');

// ----------------------------------------------------------------------------
// --------------------------- Constructing basic actions + extended actions
// ----------------------------------------------------------------------------
export interface SupplierActions extends BasicActions {
	loadProductCount?(): any;
	addProductCount?(countObject: { [key: string]: number }): TypedAction<any>;
}

export const SupplierActions: SupplierActions = makeBasicActions(SupplierActionType) as SupplierActions;

// additional actions / extensions of the base
SupplierActions.loadProductCount = () => {
	return {
		type: SupplierActionType.LOAD_PRODUCT_COUNT,
	};
};
SupplierActions.addProductCount = (countObject: { [key: string]: number }) => {
	return {
		type: SupplierActionType.ADD_PRODUCT_COUNT,
		payload: countObject,
	};
};
