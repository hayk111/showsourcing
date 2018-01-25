import { AppComment } from '../../model/comment.model';
import { ActionType } from '../../action/target/comment.action';
import { entityInitialState, addEntities, replaceEntity } from '../../utils/entities.utils';


const initialState = entityInitialState;

export function commentReducer(state = initialState, action) {

	switch (action.type) {

		case ActionType.ADD:
			return addEntities(state, action.payload.comments);

		case ActionType.CREATE:
			return addEntities(state, [action.payload.comment]);

		case ActionType.REPLACE:
			const id = action.payload.id;
			const replacing = action.payload.replacing;
			return replaceEntity(state, id, replacing);

		default: return state;
	}
}
