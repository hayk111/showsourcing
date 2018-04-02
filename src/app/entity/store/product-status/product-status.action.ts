import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM } from '../entity.model';

export const productStatusActionTypes = makeEntityActionTypes(ERM.productStatus.entityName);
export const productStatusActions = new EntityActions(productStatusActionTypes);
