import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';
import { Supplier } from '../model/supplier.model';

export enum ActionType {
		SET_SUPPLIERS = '[Supplier] setting',
}

export class SupplierActions {
		static setSuppliers(payload: Array<Supplier>): TypedAction<Array<Supplier>> {
				return {
						type: ActionType.SET_SUPPLIERS,
						payload
				};
		}

}
