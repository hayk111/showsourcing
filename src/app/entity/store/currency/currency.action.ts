import { makeEntityActionTypes, EntityActions } from '../entity.action.factory';
import { ERM } from '../entity.model';

export const currencyActionTypes = makeEntityActionTypes(ERM.currency);
export const currencyActions = new EntityActions(currencyActionTypes);
