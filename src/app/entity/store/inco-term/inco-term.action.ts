import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM } from '../entity.model';

export const incoTermsActionTypes = makeEntityActionTypes(ERM.incoTerm);
export const incoTermsActions = new EntityActions(incoTermsActionTypes);