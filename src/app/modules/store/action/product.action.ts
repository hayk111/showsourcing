import { Action } from '@ngrx/store';
import { Product } from '../model/product.model';
import { TypedAction } from '../utils/typed-action.interface';

export enum ActionType {
		SET_PRODUCTS = '[Product] setting',
		SET_PENDING = '[Product] pending'
}

export class ProductActions {
		static setProducts(payload: Array<Product>): TypedAction<Array<Product>> {
				return {
						type: ActionType.SET_PRODUCTS,
						payload
				};
		}
}
