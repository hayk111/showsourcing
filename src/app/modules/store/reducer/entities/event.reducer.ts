import { TypedAction } from '../../utils/typed-action.interface';
import { ActionType } from '../../action/entities/event.action';
import { EntityState, addEntities, entityInitialState, copyById, removeId } from '../../utils/entities.utils';
import { Event } from '../../model/entities/event.model';



export function eventsReducer(state = entityInitialState, action: TypedAction<any> ): EntityState<Event> {
	let id;
	switch (action.type) {
		case ActionType.ADD:
			return addEntities(state, action.payload);

		case ActionType.PATCH:
			id = action.payload.id;
			const propName = action.payload.propName;
			const value = action.payload.value;
			return copyById(state, id, { [propName]: value } );

		case ActionType.DELETE:
			id = action.payload;
			return removeId(state, id);

		default: return state;
	}
}
