import { entityInitialState, EntityState, addEntities, removeEntities, replaceEntities } from '~app/entity';
import { AppComment } from './comment.model';
import { CommentActionTypes } from './comment.action';

export interface State extends EntityState<AppComment> { }

const initialState = entityInitialState;

export function reducer(state: State = initialState, action) {
	switch (action.type) {
		case CommentActionTypes.CREATE:
			return addEntities(state, [action.payload]);
		case CommentActionTypes.SET:
			return addEntities(initialState, action.payload);
		case CommentActionTypes.REMOVE:
			return removeEntities(state, [action.payload]);
		case CommentActionTypes.REPLACE:
			return replaceEntities(state, [action.payload]);
		default:
			return state;
	}
}

