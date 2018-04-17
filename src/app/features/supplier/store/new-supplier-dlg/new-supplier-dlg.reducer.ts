import { Supplier } from '~app/entity/store/supplier/supplier.model';
import { NewSupplierDlgActionType as ActionType } from './new-supplier-dlg.actions';

export interface State {
	pending: boolean;
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


export const selectPending = (state) => state.pending;


