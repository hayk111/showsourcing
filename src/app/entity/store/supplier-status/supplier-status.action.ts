import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM } from '../entity.model';

export const supplierStatusActionTypes = makeEntityActionTypes(ERM.supplierStatus);
export const supplierStatusActions = new EntityActions(supplierStatusActionTypes);
