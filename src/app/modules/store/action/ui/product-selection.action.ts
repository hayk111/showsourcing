import { Product } from "../../model/entities/product.model";
import { Action } from "rxjs/scheduler/Action";


export enum ActionType {
	ADD = '[ProductSelection] Adding',
	REMOVE = '[ProductSelection] Removing'
}

export class ProductSelectionAction {
	static add(id: string) {
		return {
			type: ActionType.ADD,
			payload: id
		};
	}

	static remove(id: string) {
		return {
			type: ActionType.REMOVE,
			payload: id
		};
	}
}