import { entityInitialState, EntityState, addEntities, removeEntities } from '~app/entity';
import { AppComment } from './comment.model';
import { CommentActionTypes } from './comment.action';

export interface State extends EntityState<AppComment> { }

const initialState = entityInitialState;

export function reducer(state: State = initialState, action) {
	switch (action.type) {
		case CommentActionTypes.CREATE:
			addEntities(state, [action.payload]);
			break;
		case CommentActionTypes.SET:
			addEntities(initialState, action.payload);
			break;
		case CommentActionTypes.REMOVE:
			removeEntities(state, [action.payload]);
			break;
		default:
			return state;
	}
}

