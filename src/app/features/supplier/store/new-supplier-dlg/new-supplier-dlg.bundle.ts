import { Supplier } from '~app/entity/store/supplier/supplier.model';

export enum ActionType {
	CREATE_SUPPLIER = '[New Supplier Dialog] Creating',
	SET_READY = '[New Supplier Dialog] setting ready'
}


export class Actions {

	static createSupplier(supplier: Supplier) {
		return {
			type: ActionType.CREATE_SUPPLIER,
			payload: supplier
		};
	}
}

const initialState = {
	pending: false
};

export function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionType.CREATE_SUPPLIER:
			return { ...state, pending: true };
		case ActionType.SET_READY:
			return { ...state, pending: false };
		default:
			return state;
	}
}


export const fromSupplierDialog = {
	Actions,
	reducer,
	selectPending: (state) => state.supplier.newSupplierDlg.pending
};


