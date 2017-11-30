import { Action } from '@ngrx/store';
import { Product } from '../model/product.model';
import { TypedAction } from '../utils/typed-action.interface';

export enum ActionType {
		SET_DATA = '[Product] setting',
		SET_PENDING = '[Product] pending',
		PATCH_PROPERTY = '[Product] patching'
}

export class ProductActions {
		static setData(payload: Array<Product>): TypedAction<Array<Product>> {
				return {
						type: ActionType.SET_DATA,
						payload
				};
		}

		static setPending() {
			return {
				type: ActionType.SET_PENDING
			};
		}

		static patch(id: string, propName: string, value: any) {
			return {
				type: ActionType.PATCH_PROPERTY,
				payload: { id, propName, value }
			};
		}
}
