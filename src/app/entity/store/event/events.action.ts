import { makeEntityActionTypes, EntityActions } from '../entity.action.factory';
import { ERM } from '../entity.model';

export const eventActionTypes = makeEntityActionTypes(ERM.events);
export const eventActions = new EntityActions(eventActionTypes);
// additional actions / extensions of the base
ERM.events.actions = eventActions;
