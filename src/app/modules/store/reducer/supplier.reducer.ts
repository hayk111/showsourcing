import { TypedAction } from '../utils/typed-action.interface';
import { EntityState, addEntities, entityInitialState, copyById } from '../utils/entities.utils';
import { Supplier } from '../model/supplier.model';
import { ActionType } from '../action/supplier.action';


export function supplierReducer(state = entityInitialState, action: TypedAction<any> ): EntityState<Supplier> {
		switch (action.type) {
			case ActionType.ADD_SUPPLIERS:
				return addEntities(state, action.payload);

			case ActionType.PATCH:
				const id = action.payload.id;
				const propName = action.payload.propName;
				const value = action.payload.value;
				return copyById(state, id, { [propName]: value } );
			default:
				return state;
		}
}
