import { makeEntityActionTypes, EntityActions } from '../entity.action.factory';
import { ERM } from '../entity.model';

export const categoryActionTypes = makeEntityActionTypes(ERM.categories);
export const categoryActions = new EntityActions(categoryActionTypes);
ERM.categories.actions = categoryActions;
