import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';
import { Supplier } from '../model/supplier.model';

export enum ActionType {
	LOAD = '[Supplier] Loading',
	ADD_SUPPLIERS = '[Supplier] adding',
	PATCH = '[Supplier] patching',
	DELETE = 'Supplier deleting'
}

export class SupplierActions {

	static load(id, maxCounter) {
		return {
			type: ActionType.LOAD,
			payload: { id, maxCounter }
		};
	}

	static addSuppliers(payload: Array<Supplier>): TypedAction<Array<Supplier>> {
		return {
			type: ActionType.ADD_SUPPLIERS,
			payload
		};
	}

	static patch(id: string, propName: string, value: any) {
		return {
			type: ActionType.PATCH,
			payload: { id, propName, value }
		};
	}

	static delete(id: string) {
		return {
			type: ActionType.DELETE,
			payload: id
		};
	}

}
