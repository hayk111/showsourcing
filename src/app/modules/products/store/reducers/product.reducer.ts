import { TypedAction } from './../../../store/utils/typed-action.interface';
import { ProductActionsFactory, ActionTypes } from '../actions/product.action';
import { Product } from '../../models/product.model';
import {
	EntityState,
	entityInitialState,
	copyById,
	addEntities,
} from '../../../store/utils/entities.utils';

// tslint:disable-next-line:no-empty-interface
export interface ProductState extends EntityState<Product> {}

export function productReducer(
	state: EntityState<Product> = entityInitialState,
	action: TypedAction<any>
): ProductState {
	let id;
	switch (action.type) {
		case ActionTypes.ADD:
			return addEntities(state, action.payload);

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
