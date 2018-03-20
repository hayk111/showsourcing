import { addEntities, replaceEntity, basicReducerFactory } from '~entity';
import { TypedAction } from '~utils';
import { entityInitialState } from '~entity';
import { ImageActionType } from './images.action';

export const basicReducer = basicReducerFactory(ImageActionType);

export function imageReducer(state = entityInitialState, action: TypedAction<any>) {
	switch (action.type) {
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
						pending: true,
					},
				},
			};

		default:
			return basicReducer(state, action);
	}
}
