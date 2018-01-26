import { TypedAction } from '../utils/typed-action.interface';
import { ActionType } from '../action/event.action';
import { EntityState, addEntities, entityInitialState, copyById } from '../utils/entities.utils';
import { Event } from '../model/event.model';



export function eventsReducer(state = entityInitialState, action: TypedAction<any> ): EntityState<Event> {
	switch (action.type) {
		case ActionType.ADD_EVENTS:
			return addEntities(state, action.payload);

		case ActionType.PATCH:
			const id = action.payload.id;
			const propName = action.payload.propName;
			const value = action.payload.value;
			return copyById(state, id, { [propName]: value } );
		default: return state;
	}
}
