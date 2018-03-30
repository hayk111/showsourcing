import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM } from '../entity.model';

export const tagActionTypes = makeEntityActionTypes(ERM.tag);
export const tagActions = new EntityActions(tagActionTypes);
ERM.tag.actions = tagActions;
