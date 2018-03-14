import {
	BasicActions,
	BasicActionTypes,
	ERM,
	makeBasicActions,
	makeBasicActionTypes,
} from '~entity';

// ----------------------------------------------------------------------------
// --------------------------- Constructing basic actions type + extended types
// ----------------------------------------------------------------------------
export interface EventActionTypes extends BasicActionTypes {}
export const EventActionTypes: EventActionTypes = makeBasicActionTypes(ERM.events);

// ----------------------------------------------------------------------------
// --------------------------- Constructing basic actions + extended actions
// ----------------------------------------------------------------------------
export interface EventActions extends BasicActions {}
export const EventActions: EventActions = makeBasicActions(EventActionTypes);

// additional actions / extensions of the base
ERM.events.actions = EventActions;
