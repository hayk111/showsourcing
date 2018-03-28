import { makeEntityActionTypes, EntityActions } from '../entity.action.factory';
import { ERM } from '../entity.model';

export const countryActionTypes = makeEntityActionTypes(ERM.country);
export const countryActions = new EntityActions(countryActionTypes);
