import { Action } from '@ngrx/store';
import { Category } from '../../model/entities/category.model';
import { TypedAction } from '../../utils/typed-action.interface';
import { Patch } from '../../utils/patch.interface';


export enum ActionType {
	LOAD = '[Categories] Loading',
	ADD = '[Categories] adding',
	CREATE = '[Categories] creating',
	PATCH = '[Categories] patching',
	DELETE = '[Categories] deleting',
	MERGE = '[Categories] merging'
}

export class CategoryActions {
	static load(id: string, maxCounter: number) {
		return {
			type: ActionType.LOAD,
			payload: { id, maxCounter }
		};
	}

	static add(payload: Array<Category>): TypedAction<Array<Category>> {
		return {
			type: ActionType.ADD,
			payload
		};
	}

	static patch(patch: Patch) {
		return {
			type: ActionType.PATCH,
			payload: patch
		};
	}

	static delete(id: string) {
		return {
			type: ActionType.DELETE,
			payload: id
		};
	}
}
