import { Entity, entityInitialState, EntityState } from 'app/shared/entity/models/index';
import { BasicActionTypes } from 'app/shared/entity/store/index';
import { TypedAction } from '~utils';

import { addEntities, copyById, removeEntities, replaceEntity, replaceEntities } from '~entity/utils';

// hassan, , stop moving this file outside of Entity module, plz, I made this module to regroup utils/generic for the store / entity.
export function basicReducerFactory<G extends Entity>(
	actionType: BasicActionTypes,
	initialState: EntityState<G> = entityInitialState
) {
	return function(state = initialState, action: TypedAction<any>) {
		let id;
		if (action.payload) id = action.payload.id;

		switch (action.type) {
			// when selecting one of the entities (to look at the details)
			case actionType.SELECT:
				return {
					...state,
					selected: action.payload,
				};
			// we reset the state using the initiale state to override the store values
			case actionType.SET:
				return addEntities(initialState, action.payload);

			// entities in payload are added to the current state
			case actionType.CREATE:
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
