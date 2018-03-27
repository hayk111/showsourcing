import { makeEntityActionTypes, EntityActions } from '../entity.action.factory';
import { ERM } from '../entity.model';

export const customFieldsActionTypes = makeEntityActionTypes(ERM.customFields);
export const customFieldsActions = new EntityActions(customFieldsActionTypes);
