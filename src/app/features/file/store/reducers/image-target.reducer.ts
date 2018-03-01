import { TypedAction } from '~utils';
import { addEntities, entityInitialState, replaceEntity } from '~entity';
import { ImageActionType } from '../actions';

export function imageSelectionReducer(state = entityInitialState, action: TypedAction<any>) {
	switch (action.type) {

		case ImageActionType.SET:
			return addEntities(state, action.payload);

		case ImageActionType.ADD:
			return addEntities(state, [action.payload]);

		case ImageActionType.LOAD:
			return entityInitialState;

		case ImageActionType.REPLACE:
			return replaceEntity(state, action.payload.old, action.payload.replacing);

		case ImageActionType.ROTATE:
			const id = action.payload.id;
			let rotation = state.byId[id].rotation || 0;
			rotation++;

			return {
				...state,
				byId: {
					...state.byId,
					[id]: {
						...state.byId[id],
						rotation,
						pending: true
					}
				}
			};

		default: return state;
	}
}
