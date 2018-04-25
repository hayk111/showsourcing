import { Supplier } from '~app/entity/store/supplier/supplier.model';
import { ApiParams } from '~app/entity/utils/api-params.interface';

export enum SupplierListActionType {
	LOAD = '[Suppler List] Loading',
	LOAD_MORE = '[Supplier List] loading more suppliers',
	ADD = '[Supplier List] Adding',
	SET = '[Supplier List] Setting',
	SET_FULLY_LOADED = '[Supplier List] Setting fully loaded',
	DELETE = '[Supplier List] Deleting supplier from supplier list'
}


export class SupplierListActions {
	static load(params: ApiParams) {
		return {
			type: SupplierListActionType.LOAD,
			payload: params
		};
	}

	static loadMore(params: ApiParams) {
		return {
			type: SupplierListActionType.LOAD_MORE,
			payload: params
		};
	}

	static add(suppliers: Array<Supplier>) {
		return {
			type: SupplierListActionType.ADD,
			payload: suppliers
		};
	}

	static set(suppliers: Array<Supplier>) {
		return {
			type: SupplierListActionType.SET,
			payload: suppliers
		};
	}

	static setFullyLoaded() {
		return {
			type: SupplierListActionType.SET_FULLY_LOADED,
		};
	}

	static delete(ids: Array<string>) {
		return {
			type: SupplierListActionType.DELETE,
			payload: ids
		};
	}
}

export interface State {
	ids: Array<string>;
	pending: boolean;
	fullyLoaded: boolean;
}

const initialState = {
	ids: [],
	pending: true,
	// whether we downloaded everything from the server
	fullyLoaded: false
};

export function reducer(state = initialState, action) {
	let added;
	switch (action.type) {
		case SupplierListActionType.LOAD_MORE:
		case SupplierListActionType.LOAD:
			return { ...state, pending: true, fullyLoaded: false };
		case SupplierListActionType.ADD:
			added = action.payload.map(supplier => supplier.id);
			// we only add the ids
			return { ...state, ids: [...state.ids, ...added], pending: false };
		case SupplierListActionType.SET:
			added = action.payload.map(supplier => supplier.id);
			return { ...state, pending: false, ids: added };
		case SupplierListActionType.SET_FULLY_LOADED:
			return { ...state, fullyLoaded: true };
		case SupplierListActionType.DELETE:
			const toDel: Array<string> = action.payload;
			return { ...state, ids: state.ids.filter(id => toDel.some(delId => delId !== id)) };
		default: return state;
	}
}



const selectPending = (state: State) => state.pending;
const selectIds = (state: State) => state.ids;
