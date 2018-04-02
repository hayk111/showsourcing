import { makeEntityActionTypes, EntityActions } from '../entity.action.factory';
import { ERM } from '../entity.model';

export const currencyActionTypes = makeEntityActionTypes(ERM.currency.entityName);
export const currencyActions = new EntityActions(currencyActionTypes);
