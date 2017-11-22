import { TypedAction } from '../utils/typed-action.interface';
import { ActionType } from '../action/product.action';
import { Product } from '../model/product.model';
import { EntityState, entityInitialState, setEntities } from '../utils/entities.utils';



export function productReducer(state: EntityState<Product> = entityInitialState, action: TypedAction<Array<Product>> )
: EntityState<Product> {
	switch (action.type) {
		case ActionType.SET_DATA:
			return setEntities(action.payload);
		case ActionType.SET_PENDING:
			return { ...state, pending: true };
		default: return state;
	}
}
