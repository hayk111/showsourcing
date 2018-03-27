import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM } from '../entity.model';

export const productStatusActionTypes = makeEntityActionTypes(ERM.productStatus);
export const productStatusActions = new EntityActions(productStatusActionTypes);
