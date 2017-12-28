import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';
import { Supplier } from '../model/supplier.model';

export enum ActionType {
	LOAD = '[Supplier] Loading',
	ADD_SUPPLIERS = '[Supplier] adding',
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

}
