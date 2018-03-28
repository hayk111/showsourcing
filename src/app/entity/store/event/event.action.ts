import { makeEntityActionTypes, EntityActions } from '../entity.action.factory';
import { ERM } from '../entity.model';

export const eventActionTypes = makeEntityActionTypes(ERM.event);
export const eventActions = new EntityActions(eventActionTypes);
// additional actions / extensions of the base
ERM.event.actions = eventActions;
