import { createSelector } from 'reselect';
import { CustomFieldsName } from '../reducer/custom-fields.reducer';


export const selectCustomFields = state => state.entities.customFields;

export const selectCustomField = (name: CustomFieldsName | string) => {
	return createSelector([selectCustomFields], cf => cf[name]);
};
