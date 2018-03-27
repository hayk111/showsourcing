import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM } from '../entity.model';

export const harbourActionTypes = makeEntityActionTypes(ERM.harbours);
export const harbourActions = new EntityActions(harbourActionTypes);
