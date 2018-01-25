import { entityInitialState, addEntities, replaceEntity } from '../../utils/entities.utils';
import { ActionType } from '../../action/entities/comment.action';


const initialState = entityInitialState;

export function commentReducer(state = initialState, action) {

	switch (action.type) {

		case ActionType.ADD:
			return addEntities(state, action.payload.added);

		case ActionType.REPLACE:
			const old = action.payload.old;
			const replacing = action.payload.replacing;
			return replaceEntity(state, old, replacing);

		default: return state;
	}
}
