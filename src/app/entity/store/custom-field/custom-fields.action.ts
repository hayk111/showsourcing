import { makeEntityActionTypes, EntityActions } from '../entity.action.factory';
import { ERM } from '../entity.model';

export const customFieldsActionTypes = makeEntityActionTypes(ERM.customField.entityName);
export const customFieldsActions = new EntityActions(customFieldsActionTypes);
