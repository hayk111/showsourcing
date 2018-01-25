import { Action } from '@ngrx/store';
import { Category } from '../../model/entities/category.model';

export enum ActionType {
	LOAD = '[Categories] Loading',
	ADD_CATEGORIES = '[Categories] adding',
}

export class CategoryActions {
	static load(id: string, maxCounter: number) {
		return {
			type: ActionType.LOAD,
			payload: { id, maxCounter }
		};
	}

	static addCategories(payload: Array<Category>) {
		return {
			type: ActionType.ADD_CATEGORIES,
			payload
		};
	}
}
