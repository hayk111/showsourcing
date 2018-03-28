import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM } from '../entity.model';

export const teamMembersActionTypes = makeEntityActionTypes(ERM.event);
export const teamMembersActions = new EntityActions(teamMembersActionTypes);
