import {
	addEntities,
	copyById,
	removeEntity,
	replaceEntity,
} from './../../utils';
import { TypedAction } from '~utils';
import { entityInitialState } from './../../models';

export function basicReducerFactory(actionType: any) {
	return function(state = entityInitialState, action: TypedAction<any>) {
		let id;
		if (action.payload) id = action.payload.id;

		switch (action.type) {
			// entities are set to the ones in the payload
			case actionType.SET:
				return addEntities(entityInitialState, action.payload);

			// entities in payload are added to the current state
			case actionType.ADD:
				return addEntities(state, action.payload);

			// modifying specific entity
			case actionType.PATCH:
				const propName = action.payload.propName;
				const value = action.payload.value;
				return copyById(state, id, { [propName]: value });

			// replacing
			case actionType.REPLACE:
				return replaceEntity(state, action.payload.old, action.payload.replacing);

			case actionType.DELETE:
				return removeEntity(state, id);

			case actionType.LOAD:
			case actionType.LOAD_MORE:
			case actionType.SET_PENDING:
				return { ...state, pending: true };

			default:
				return state;
		}
	};
}
