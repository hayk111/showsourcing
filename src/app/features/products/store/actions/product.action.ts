import {
	addActionType,
	BasicActions,
	BasicActionTypes,
	ERM,
	makeBasicActions,
	makeBasicActionTypes,
} from '~entity';
import { TypedAction } from '~utils';

// Extending action constants with specific ones
export interface ProductActionTypes extends BasicActionTypes {
	REQUEST_PDF?: string;
}
export const ProductActionTypes: ProductActionTypes = makeBasicActionTypes(
	ERM.product
);
addActionType(ProductActionTypes, ERM.product, 'REQUEST_PDF');

export interface ProductActions extends BasicActions {
	requestPdf?(id: string): TypedAction<String>;
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

ERM.product.actions = ProductActions;
