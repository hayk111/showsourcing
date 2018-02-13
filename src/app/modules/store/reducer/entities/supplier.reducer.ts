import { TypedAction } from '../../utils/typed-action.interface';
import { EntityState, addEntities, entityInitialState, copyById, removeEntity } from '../../utils/entities.utils';
import { Supplier } from '../../model/entities/supplier.model';
import { ActionType } from '../../action/entities/supplier.action';


export function supplierReducer(state = entityInitialState, action: TypedAction<any> ): EntityState<Supplier> {
	let id;
		switch (action.type) {
			case ActionType.ADD_SUPPLIERS:
				return addEntities(state, action.payload);

			case ActionType.PATCH:
				id = action.payload.id;
				const propName = action.payload.propName;
				const value = action.payload.value;
				return copyById(state, id, { [propName]: value } );


			case ActionType.DELETE:
				id = action.payload;
				return removeEntity(state, id);

			default:
				return state;
		}
}
