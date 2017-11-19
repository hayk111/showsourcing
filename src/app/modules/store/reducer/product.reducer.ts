import { TypedAction } from "../utils/typed-action.interface";
import { ActionType } from "../action/product.action";
import { Product } from "../model/product.model";


const initialState = {
	pending: false,
	data: []
}

export interface ProductsState {
	pending: boolean;
	data: Array<Product>;
}

export function productReducer(state = initialState, action: TypedAction<Array<Product>> ): ProductsState {
	switch (action.type) {
		case ActionType.SET_PRODUCTS:
			return { ...state, data: action.payload, pending: false };
		case ActionType.SET_PENDING:
			return { ...state, pending: true };
		default: return state;
	}
}
