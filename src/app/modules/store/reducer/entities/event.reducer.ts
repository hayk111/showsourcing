import { entityInitialState, EntityState, addEntities } from '../../utils/entities.utils';
import { TypedAction } from '../../utils/typed-action.interface';
import { ActionType } from '../../action/entities/event.action';
import { Event } from './../../model/entities/event.model';


export function eventsReducer(state = entityInitialState, action: TypedAction<any> ): EntityState<Event> {
	switch (action.type) {
		case ActionType.ADD_EVENTS:
			return addEntities(state, action.payload);
		default: return state;
	}
}
