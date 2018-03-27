import { makeEntityActionTypes, EntityActions } from '../entity.action.factory';
import { ERM } from '../entity.model';

export const countryActionTypes = makeEntityActionTypes(ERM.countries);
export const countryActions = new EntityActions(countryActionTypes);
