import { addEntities, replaceEntity, basicReducerFactory } from '~entity';
import { TypedAction } from '~utils';
import { entityInitialState } from '~entity';
import { imageActionTypes } from './images.action';

export const basicReducer = basicReducerFactory(imageActionTypes);

export function imageReducer(state = entityInitialState, action: TypedAction<any>) {
	switch (action.type) {
		case imageActionTypes.ROTATE:
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
						pending: true,
					},
				},
			};

		default:
			return basicReducer(state, action);
	}
}
