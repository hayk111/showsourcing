import { Action } from '@ngrx/store';
import { Product } from '../model/product.model';
import { TypedAction } from '../utils/typed-action.interface';
import { AppComment } from '../model/comment.model';
import { FilterGroupName } from '../model/filter.model';
import { AppFile } from '../model/app-file.model';
import { Tag } from '../model/tag.model';
import { Project } from '../model/project.model';
import { Task } from '../model/task.model';

export enum ActionType {
		LOAD = '[Product] loading',
		SET_PENDING = '[Product] pending',
		SET = '[Product] setting',
		ADD = '[Product] adding',
		PATCH = '[Product] patching',
		REQUEST_PDF = '[Product] requesting pdf'
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


	static set(payload: Array<Product>): TypedAction<Array<Product>> {
			return {
					type: ActionType.SET,
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

}
