import { Action } from '@ngrx/store';
import { Product } from '../model/product.model';
import { TypedAction } from '../utils/typed-action.interface';
import { ProductVote } from '../model/product-vote.model';
import { AppComment } from '../model/comment.model';
import { FilterGroupName } from '../model/filter.model';
import { AppFile } from '../model/app-file.model';

export enum ActionType {
		LOAD = '[Product load]',
		SET_PENDING = '[Product] pending',
		SET_DATA = '[Product] setting',
		PATCH_PROPERTY = '[Product] patching',
}

export class ProductActions {

	static load(filterGroupName?: FilterGroupName) {
		return {
			type: ActionType.LOAD,
			payload: filterGroupName
		};
	}

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
