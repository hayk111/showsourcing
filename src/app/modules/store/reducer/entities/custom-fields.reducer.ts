import { TypedAction } from '../../utils/typed-action.interface';
import { CustomFieldsActionTypes as ActionType } from '../../action/entities/index';
import { FormDescriptor } from '../../../shared/dynamic-forms/utils/descriptors.interface';

export interface CustomFields {
	[key: string]: FormDescriptor;
}

export function customFieldsReducer(state: CustomFields = {}, action: TypedAction<any> ): CustomFields {
	switch (action.type) {
		case ActionType.ADD:
			return action.payload;
		default:
			return state;
	}
}

export enum CustomFieldsName {
	PRODUCTS = 'productsCFDef',
}
