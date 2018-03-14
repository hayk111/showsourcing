import { EntityState } from '~entity';
import { entityInitialState } from '~entity/models/entities.model';
import { basicReducerFactory } from '~store/reducer';
import { TypedAction } from '~utils/typed-action.interface';

import { Event } from '../models';
import { EventActionTypes } from './events.action';

// ----------------------------------------------------------------------------
// --------------------------- Defining State
// ----------------------------------------------------------------------------
export interface EventsState extends EntityState<Event> {}
export interface EntitiesState {
	events: EventsState;
}

// ----------------------------------------------------------------------------
// --------------------------- Constructing basic reducer + extended reducer
// ----------------------------------------------------------------------------
export const basicEventReducer = basicReducerFactory(EventActionTypes);

export function eventReducer(state = entityInitialState, action: TypedAction<any>) {
	switch (action.type) {
		default:
			return basicEventReducer(state, action);
	}
}
