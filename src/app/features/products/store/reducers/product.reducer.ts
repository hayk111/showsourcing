import {
	addEntities,
	copyById,
	entityInitialState,
	EntityState,
} from '~entity';
import { TypedAction } from '~utils';

import { Product } from '../../models/product.model';
import { ActionTypes } from '../actions/product.action';

// tslint:disable-next-line:no-empty-interface
export interface ProductState extends EntityState<Product> {}

export function productReducer(
	state: EntityState<Product> = entityInitialState,
	action: TypedAction<any>
): ProductState {
	let id;
	switch (action.type) {
		case ActionTypes.ADD:
			// we use the initial state to reset products each time we add some.
			return addEntities(entityInitialState, action.payload);

		case ActionTypes.SET_PENDING:
			return { ...state, pending: true };

		case ActionTypes.PATCH:
			id = action.payload.id;
			const propName = action.payload.propName;
			const value = action.payload.value;
			return copyById(state, id, { [propName]: value });

		default:
			return state;
	}
}
