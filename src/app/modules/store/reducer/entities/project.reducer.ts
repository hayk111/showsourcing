import { ActionType } from '../../action/target/project.action';
import { addEntities, replaceEntity, entityInitialState } from '../../utils/entities.utils';


export function projectReducer(state = entityInitialState, action) {

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
