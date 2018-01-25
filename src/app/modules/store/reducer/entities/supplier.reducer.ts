import { TypedAction } from '../utils/typed-action.interface';
import { EntityState, addEntities, entityInitialState } from '../utils/entities.utils';
import { Supplier } from '../model/supplier.model';
import { ActionType } from '../action/supplier.action';


export function supplierReducer(state = entityInitialState, action: TypedAction<Array<Supplier>> ): EntityState<Supplier> {
		switch (action.type) {
			case ActionType.ADD_SUPPLIERS:
				return addEntities(state, action.payload);
			default:
				return state;
		}
}
