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
	VOTE?: string;
}
export const ProductActionTypes: ProductActionTypes = makeBasicActionTypes(
	ERM.product
);
addActionType(ProductActionTypes, ERM.product, 'REQUEST_PDF');
addActionType(ProductActionTypes, ERM.product, 'REQUEST_FEEDBACK');
addActionType(ProductActionTypes, ERM.product, 'REQUEST_FEEDBACK_SUCCESS');
addActionType(ProductActionTypes, ERM.product, 'VOTE');

// ----------------------------------------------------------------------------
// --------------------------- Constructing basic actions + extended actions
// ----------------------------------------------------------------------------
export interface ProductActions extends BasicActions {
	requestPdf?(id: string): TypedAction<string>;
	requestFeedback?(
		productsIds: Array<string>,
		recipientsIds: Array<string>
	): TypedAction<any>;
	requestFeedbackSuccess?(result: any): TypedAction<any>;
	vote?(id: string, value: 0 | 100): TypedAction<any>;
}
export const ProductActions: ProductActions = makeBasicActions(
	ProductActionTypes
);

// additional actions / extensions of the base
ProductActions.requestPdf = (id: string) => {
	return {
		type: ProductActionTypes.REQUEST_PDF,
		payload: id,
	};
};
ProductActions.requestFeedback = (
	productsIds: Array<string>,
	recipientsIds: Array<string>
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
ProductActions.vote = (id: string, value: 0 | 100) => {
	return {
		type: ProductActionTypes.VOTE,
		payload: { id, value },
	};
};
