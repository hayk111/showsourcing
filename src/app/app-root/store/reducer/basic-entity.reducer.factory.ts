import { Entity, entityInitialState, EntityState } from '~entity/models';
import { BasicActionTypes } from '~entity/store/actions/entity.action.factory';
import { TypedAction } from '~utils';

import { addEntities, copyById, removeEntity, replaceEntity } from './../utils';

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

			// replacing
			case actionType.REPLACING:
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
