import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM } from '../entity.model';

export const teamActionTypes = makeEntityActionTypes(ERM.team.entityName);
export const teamActions = new EntityActions(teamActionTypes);
