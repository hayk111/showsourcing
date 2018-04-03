import { Entity, entityInitialState, EntityState } from './entity.model';
import { EntityActionTypes } from './entity.action.factory';
import { TypedAction } from '~utils';

import { addEntities, removeEntities, replaceEntity, replaceEntities, updateOne } from '../utils';

// hassan, , stop moving this file outside of Entity module, plz, I made this module to regroup utils/generic for the store / entity.
export function entityReducerFactory<G extends Entity>(
	actionType: EntityActionTypes,
	initialState: EntityState<G> = entityInitialState
) {
	return function (state = initialState, action: TypedAction<any>) {
		let id;
		if (action.payload) id = action.payload.id;

		switch (action.type) {
			// when selecting one of the entities (to look at the details)
			case actionType.FOCUS:
				return {
					...state,
					focussed: action.payload,
				};
			// we reset the state using the initiale state to override the store values
			case actionType.SET:
				return addEntities(initialState, action.payload);

			// entities in payload are added to the current state
			case actionType.CREATE:
				return {
					...state,
					byId: {
						...state.byId,
						[id]: action.payload
					},
					ids: [id, ...state.ids]
				};
			case actionType.ADD:
				return addEntities(state, action.payload);

			// modifying specific entity
			case actionType.PATCH:
				const propName = action.payload.propName;
				const value = action.payload.value;
				return updateOne(state, id, propName, value);

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

			case actionType.RESET:
				return initialState;

			default:
				return state;
		}
	};
}
