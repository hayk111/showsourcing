import { Action } from '@ngrx/store';
import { Product } from '../../models/product.model';
import {
	addActionType,
	makeBasicActionTypes,
	makeBasicActions,
	BasicActionTypes,
	BasicActions
} from '../../../store/action/entities/_entity.action.factory';
import { entityRepresentationMap } from '../../../store/utils/entities.utils';
import { TypedAction } from '../../../store/utils/typed-action.interface';

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
export const ProductActionsFactory: ProductActions = makeBasicActions(ActionTypes);
ProductActionsFactory.requestPdf = (id: string) => {
	return {
		type: ActionTypes.REQUEST_PDF,
		payload: id
	};
};

entityRepresentationMap.product.actions = ProductActionsFactory;
