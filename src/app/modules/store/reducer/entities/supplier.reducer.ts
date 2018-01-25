import { entityInitialState, EntityState, addEntities } from '../../utils/entities.utils';
import { TypedAction } from '../../utils/typed-action.interface';
import { Supplier } from '../../model/entities/supplier.model';
import { ActionType } from '../../action/entities/supplier.action';




export function supplierReducer(state = entityInitialState, action: TypedAction<Array<Supplier>> )
: EntityState<Supplier> {
		switch (action.type) {
			case ActionType.ADD_SUPPLIERS:
				return addEntities(state, action.payload);
			default:
				return state;
		}
}
