import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM } from '../entity.model';

export const harbourActionTypes = makeEntityActionTypes(ERM.harbour);
export const harbourActions = new EntityActions(harbourActionTypes);
