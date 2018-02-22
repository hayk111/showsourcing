import { EntityState, entityInitialState, TypedAction, addEntities, copyById } from '@modules/store';
import { Supplier } from '@modules/suppliers';
import { basicReducerFactory } from '@modules/store';
import { ActionType } from '@modules/suppliers';

// tslint:disable-next-line:no-empty-interface
export interface SupplierState extends EntityState<Supplier> {}

export function reducer(
	state: EntityState<Supplier> = entityInitialState,
	action: TypedAction<any>
): SupplierState {
	let id;
	switch (action.type) {
		case ActionType.ADD:
			return addEntities(state, action.payload);

		case ActionType.SET_PENDING:
			return { ...state, pending: true };

		case ActionType.PATCH:
			id = action.payload.id;
			const propName = action.payload.propName;
			const value = action.payload.value;
			return copyById(state, id, { [propName]: value });

		default:
			return state;
	}
}
