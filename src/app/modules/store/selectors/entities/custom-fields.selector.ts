import { createSelector } from 'reselect';


export const selectCustomFields = state => state.entities.customFields;

export const selectCustomField = (name: string) => {
	return createSelector([selectCustomFields], cf => cf[name]);
};
