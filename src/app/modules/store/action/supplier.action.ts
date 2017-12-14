import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';
import { Supplier } from '../model/supplier.model';

export enum ActionType {
	LOAD = '[Supplier] Loading',
	SET_SUPPLIERS = '[Supplier] setting',
}

export class SupplierActions {

	static load(maxCounter) {
		return {
			type: ActionType.LOAD,
			payload: maxCounter
		};
	}

	static setSuppliers(payload: Array<Supplier>): TypedAction<Array<Supplier>> {
		return {
			type: ActionType.SET_SUPPLIERS,
			payload
		};
	}

}
