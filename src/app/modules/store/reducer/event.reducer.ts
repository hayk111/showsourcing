import { TypedAction } from '../utils/typed-action.interface';
import { ActionType } from '../action/event.action';
import { EntityState, addEntities, entityInitialState } from '../utils/entities.utils';
import { Event } from '../model/event.model';



export function eventsReducer(state = entityInitialState, action: TypedAction<any> ): EntityState<Event> {
	switch (action.type) {
		case ActionType.SET_EVENTS:
			return addEntities(state, action.payload);
		default: return state;
	}
}
