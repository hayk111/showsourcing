import { Action } from '@ngrx/store';
import { Product } from '../../model/entities/product.model';

export enum ActionType {
		LOAD = '[Product] loading',
		SET = '[Product] setting',
		ADD = '[Product] adding',
		PATCH = '[Product] patching',
		REQUEST_PDF = '[Product] requesting pdf',
		SET_PENDING = '[Product] setting pending',

		ADD_COMMENTS = '[Product] adding comments',
		REMOVE_COMMENT = '[Product] removing comment',
		ADD_PROJECTS = '[Product] adding projects',
		REMOVE_PROJECT = '[Product] removing project',
		ADD_TAGS = '[Product] adding tags',
		REMOVE_TAG = '[Product] removing tag',
		ADD_TASKS = '[Product] adding tasks',
		REMOVE_TASK = '[Product] remove task'
}

export class ProductActions {

	static load(teamId: string, counter: number) {
		return {
			type: ActionType.LOAD,
			payload: { teamId, counter }
		};
	}

	static add(product: Array<Product>) {
		return {
			type: ActionType.ADD,
			payload: product
		};
	}

	static set(payload: Array<Product>) {
			return {
					type: ActionType.SET,
					payload
			};
	}

	static patch(id: string, propName: string, value: any) {
		return {
			type: ActionType.PATCH,
			payload: { id, propName, value }
		};
	}

	static requestPdf(id: string) {
		return {
			type: ActionType.REQUEST_PDF,
			payload: id
		};
	}

	static addTags(ids: Array<string>) {
		return {
			type: ActionType.ADD_TAGS,
			payload: ids
		};
	}

	static addProjects(ids: Array<string>) {
		return {
			type: ActionType.ADD_PROJECTS,
			payload: ids
		};
	}

	static addTasks(ids: Array<string>) {
		return {
			type: ActionType.ADD_TASKS,
			payload: ids
		};
	}

	static addComments(ids: Array<string>) {
		return {
			type: ActionType.ADD_COMMENTS,
			payload: ids
		};
	}

	static removeTag(id) {
		return {
			type: ActionType.REMOVE_TAG,
			payload: id
		};
	}

	static removeComment(id) {
		return {
			type: ActionType.REMOVE_COMMENT,
			payload: id
		};
	}

	static removeTask(id) {
		return {
			type: ActionType.REMOVE_TASK,
			payload: id
		};
	}

	static removeProject(id) {
		return {
			type: ActionType.REMOVE_PROJECT,
			payload: id
		};
	}
}
