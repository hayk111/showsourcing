import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM } from '../entity.model';

export const supplierStatusActionTypes = makeEntityActionTypes(ERM.supplierStatus.entityName);
export const supplierStatusActions = new EntityActions(supplierStatusActionTypes);
