import { Action } from '@ngrx/store';
import { Category } from '../model/category.model';
import { TypedAction } from '../utils/typed-action.interface';

export enum ActionType {
	LOAD = '[Categories] Loading',
	ADD_CATEGORIES = '[Categories] adding',
	PATCH = '[Categories] patching'
}

export class CategoryActions {
	static load(id: string, maxCounter: number) {
		return {
			type: ActionType.LOAD,
			payload: { id, maxCounter }
		};
	}

	static addCategories(payload: Array<Category>): TypedAction<Array<Category>> {
		return {
			type: ActionType.ADD_CATEGORIES,
			payload
		};
	}

	static patch(id: string, propName: string, value: any) {
		return {
			type: ActionType.PATCH,
			payload: { id, propName, value }
		};
	}
}
