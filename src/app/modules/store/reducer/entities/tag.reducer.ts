import { ActionType } from '../../action/entities/tag.action';
import { addEntities, entityInitialState, replaceEntity } from '../../utils/entities.utils';


export function tagReducer(state = entityInitialState, action) {

	switch (action.type) {

		case ActionType.ADD:
			return addEntities(state, action.payload);

		case ActionType.CREATE:
			return addEntities(state, [action.payload]);

		case ActionType.REPLACE:
			const id = action.payload.id;
			const replacing = action.payload.replacing;
			return replaceEntity(state, id, replacing);

		default: return state;
	}
}
