import { Supplier } from '~app/entity/store/supplier/supplier.model';

export enum SupplierListActionType {
	LOAD = '[Suppler List] Loading',
	ADD = '[Supplier List] Adding'
}


export class SupplierListActions {
	static load(params: any) {
		return { type: SupplierListActionType.LOAD };
	}

	static add(suppliers: Array<Supplier>) {
		return {
			type: SupplierListActionType.ADD,
			payload: suppliers
		};
	}
}

export interface State extends Array<string> { }
const initialState = [];

export function reducer(state = initialState, action) {
	switch (action.type) {
		case SupplierListActionType.ADD:
			// we only add the ids
			return action.payload.map(supplier => supplier.id);
		default: return state;
	}
}


