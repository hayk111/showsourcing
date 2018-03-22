import { BasicActions, ERM, makeBasicActionTypes, BasicActionTypes } from '~entity';

export const eventActionTypes: BasicActionTypes = makeBasicActionTypes(ERM.events);
export const eventActions = new BasicActions(eventActionTypes);
// additional actions / extensions of the base
ERM.events.actions = eventActions;
