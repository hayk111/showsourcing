import { Supplier } from '~app/entity/store/supplier/supplier.model';
import { ApiParams } from '~app/entity/utils/api-params.interface';
import { supplierActionTypes } from '~app/entity/store/supplier/supplier.action';

export enum SupplierListActionType {
	LOAD = '[Suppler List] Loading',
	LOAD_MORE = '[Supplier List] loading more suppliers',
	ADD = '[Supplier List] Adding',
	SET = '[Supplier List] Setting',
	SET_FULLY_LOADED = '[Supplier List] Setting fully loaded',
	DELETE = '[Supplier List] Deleting supplier from supplier list',
	SELECT_ONE = '[Supplier List] Select one',
	SELECT_ALL = '[Supplier List] Select All',
	UNSELECT_ONE = '[Supplier List] Unselect one',
	UNSELECT_ALL = '[Supplier List] Unselect all'
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
	static selectOne(id: string) {
		return {
			type: SupplierListActionType.SELECT_ONE,
			payload: id
		};
	}
	static selectAll() {
		return {
			type: SupplierListActionType.SELECT_ALL
		};
	}
	static unselectOne(id: string) {
		return {
			type: SupplierListActionType.UNSELECT_ONE,
			payload: id
		};
	}
	static unselectAll() {
		return {
			type: SupplierListActionType.UNSELECT_ALL
		};
	}
}

export interface State {
	ids: Array<string>;
	pending: boolean;
	fullyLoaded: boolean;
	selected: Array<string>;
}

const initialState = {
	ids: [],
	pending: true,
	// whether we downloaded everything from the server
	fullyLoaded: false,
	selected: []
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
		case SupplierListActionType.SELECT_ONE:
			return { ...state, selected: [...state.selected, action.payload] };
		case SupplierListActionType.SELECT_ALL:
			return { ...state, selected: [...state.ids] };
		case SupplierListActionType.UNSELECT_ONE:
			return { ...state, selected: state.selected.filter(id => id !== action.payload) };
		case SupplierListActionType.UNSELECT_ALL:
			return { ...state, selected: [] };
		default: return state;
	}
}



const selectPending = (state: State) => state.pending;
const selectIds = (state: State) => state.ids;
