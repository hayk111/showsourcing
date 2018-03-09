import { Entity, entityInitialState, EntityState } from 'app/shared/entity/models/index';
import { BasicActionTypes } from 'app/shared/entity/store/index';
import { TypedAction } from '~utils';

import { addEntities, copyById, removeEntities, replaceEntity, replaceEntities } from '../../../app-root/store/utils/index';

// TODO: hassan stop moving this file outside of Entity module.
// Maybe move Entity module outside shared if you don't like this being
// in shared.
export function basicReducerFactory<G extends Entity>(
	actionType: BasicActionTypes,
	initialState: EntityState<G> = entityInitialState
) {
	return function(state = initialState, action: TypedAction<any>) {
		let id;
		if (action.payload) id = action.payload.id;

		switch (action.type) {
			// we reset the state using the initiale state to override the store values
			case actionType.SET:
				return addEntities(initialState, action.payload);

			// entities in payload are added to the current state
			case actionType.ADD:
				return addEntities(state, action.payload);

			// modifying specific entity
			case actionType.PATCH:
				const propName = action.payload.propName;
				const value = action.payload.value;
				return copyById(state, id, { [propName]: value });

			// replace one
			case actionType.REPLACE:
				return replaceEntities(state, action.payload);

			// replace many
			case actionType.REPLACE:
				return;

			case actionType.DELETE:
				return removeEntities(state, action.payload);

			case actionType.LOAD:
			case actionType.LOAD_MORE:
			case actionType.SET_PENDING:
				return { ...state, pending: true };

			default:
				return state;
		}
	};
}
