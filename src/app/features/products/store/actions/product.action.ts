import {
  addActionType,
  BasicActions,
  BasicActionTypes,
  entityRepresentationMap,
  makeBasicActions,
  makeBasicActionTypes,
} from '~entity';
import { TypedAction } from '~utils';

// Extending action constants with specific ones
export interface ProductActionTypes extends BasicActionTypes {
	REQUEST_PDF?: string;
}
export interface ProductActions extends BasicActions {
	requestPdf?(id: string): TypedAction<String>;
}

// keeping capitalization for backward compatibility
// Generating Action types constants wrapped inside one object and extending it
export const ActionTypes: ProductActionTypes = makeBasicActionTypes(entityRepresentationMap.product);
addActionType(ActionTypes, entityRepresentationMap.product, 'REQUEST_PDF');

// Generating Action factory inside one object and extending it
export const ProductActions: ProductActions = makeBasicActions(ActionTypes);
ProductActions.requestPdf = (id: string) => {
	return {
		type: ActionTypes.REQUEST_PDF,
		payload: id,
	};
};

entityRepresentationMap.product.actions = ProductActions;
