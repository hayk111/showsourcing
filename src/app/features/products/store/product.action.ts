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
export interface ProductActionTypes extends BasicActionTypes {
	REQUEST_PDF?: string;
	REQUEST_FEEDBACK?: string;
	REQUEST_FEEDBACK_SUCCESS?: string;
}
export const ProductActionTypes: ProductActionTypes = makeBasicActionTypes(
	ERM.product
);
addActionType(ProductActionTypes, ERM.product, 'REQUEST_PDF');
addActionType(ProductActionTypes, ERM.product, 'REQUEST_FEEDBACK');
addActionType(ProductActionTypes, ERM.product, 'REQUEST_FEEDBACK_SUCCESS');

// ----------------------------------------------------------------------------
// --------------------------- Constructing basic actions + extended actions
// ----------------------------------------------------------------------------
export interface ProductActions extends BasicActions {
	requestPdf?(id: string): TypedAction<String>;
	requestFeedback?(
		productsIds: Array<String>,
		recipientsIds: Array<String>
	): TypedAction<any>;
	requestFeedbackSuccess?(result: any): TypedAction<any>;
}
export const ProductActions: ProductActions = makeBasicActions(
	ProductActionTypes
);
ProductActions.requestPdf = (id: string) => {
	return {
		type: ProductActionTypes.REQUEST_PDF,
		payload: id,
	};
};
ProductActions.requestFeedback = (
	productsIds: Array<String>,
	recipientsIds: Array<String>
) => {
	return {
		type: ProductActionTypes.REQUEST_FEEDBACK,
		payload: { productsIds, recipientsIds },
	};
};
ProductActions.requestFeedbackSuccess = (result: any) => {
	return {
		type: ProductActionTypes.REQUEST_FEEDBACK_SUCCESS,
		payload: result,
	};
};

ERM.product.actions = ProductActions;
