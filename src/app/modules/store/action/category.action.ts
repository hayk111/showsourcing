import { Action } from '@ngrx/store';
import { Category } from '../model/category.model';
import { TypedAction } from '../utils/typed-action.interface';

export enum ActionType {
	ADD_CATEGORIES = '[Categories] adding',
}

export class CategoryActions {
		static addCategories(payload: Array<Category>): TypedAction<Array<Category>> {
				return {
						type: ActionType.ADD_CATEGORIES,
						payload
				};
		}
}
