import { TypedAction } from '../../utils/typed-action.interface';
import { addEntities, entityInitialState, replaceEntity } from '../../utils/entities.utils';
import { ActionType } from '../../action/selection/images-selection.action';

export function imageSelectionReducer(state = entityInitialState, action: TypedAction<any>) {
	switch (action.type) {

		case ActionType.SET:
			return addEntities(state, action.payload);

		case ActionType.ADD:
			return addEntities(state, [action.payload]);

		case ActionType.LOAD:
			return entityInitialState;

		case ActionType.REPLACE:
			return replaceEntity(state, action.payload.old, action.payload.replacing);

		case ActionType.ROTATE:
			const id = action.payload.id;
			let rotation = state.byId[id].rotation || 0;
			rotation++;

			return {
				...state,
				byId: {
					...state.byId,
					[id]: {
						...state.byId[id],
						rotation
					}
				}
			};

		default: return state;
	}
}
