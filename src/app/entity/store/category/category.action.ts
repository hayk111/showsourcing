import { makeEntityActionTypes, EntityActions } from '../entity.action.factory';
import { ERM } from '../entity.model';

export const categoryActionTypes = makeEntityActionTypes(ERM.category);
export const categoryActions = new EntityActions(categoryActionTypes);
ERM.category.actions = categoryActions;
