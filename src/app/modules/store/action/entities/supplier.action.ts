import { Action } from '@ngrx/store';
import { Supplier } from '../../model/entities/supplier.model';

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

	static addSuppliers(payload: Array<Supplier>) {
		return {
			type: ActionType.ADD_SUPPLIERS,
			payload
		};
	}

}
