import { TypedAction } from "../utils/typed-action.interface";
import { ActionType } from "../action/product.action";
import { Product } from "../model/product.model";
import { AsyncEntity } from "../utils/async-entity.utils";


const initialState = {
	pending: false,
	data: []
}


export function productReducer(state: AsyncEntity<Product> = initialState, action: TypedAction<Array<Product>> ): AsyncEntity<Product> {
	switch (action.type) {
		case ActionType.SET_DATA:
			return { ...state, data: action.payload, pending: false };
		case ActionType.SET_PENDING:
			return { ...state, pending: true };
		default: return state;
	}
}
