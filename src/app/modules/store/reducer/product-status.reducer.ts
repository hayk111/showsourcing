import { ProductStatus } from "../model/product.model";
import { EntityState, Entity } from "../utils/entities.utils";

const initialState: EntityState<Entity> = {
	maxEntityCounter: 0,
	byId: {
		'1': { id: '1', name: ProductStatus.IDEA },
		'2': { id: '2', name: ProductStatus.NEED_REVIEW },
		'3': { id: '3', name: ProductStatus.UNDER_ASSESSMENT },
		'4': { id: '4', name: ProductStatus.COMPLETE },
		'5': { id: '5', name: ProductStatus.REFUSED },
	},
	ids: ['1', '2', '3', '4', '5']
}

// we are doing a filter for product status for convenience for the filter panel
export function productStatusReducer( state = initialState, action){
	return state;
}