import { Action } from '@ngrx/store';
import { Product } from '../../model/entities/product.model';
import { TypedAction } from '../../utils/typed-action.interface';
import { AppComment } from '../../model/entities/comment.model';
import { FilterGroupName } from '../../model/misc/filter.model';
import { AppFile } from '../../model/entities/app-file.model';
import { Tag } from '../../model/entities/tag.model';
import { Project } from '../../model/entities/project.model';
import { Task } from '../../model/entities/task.model';
import { Patch } from '../../utils/patch.interface';

export enum ActionType {
		LOAD = '[Product] loading',
		SET_PENDING = '[Product] pending',
		ADD = '[Product] adding',
		PATCH = '[Product] patching',
		REQUEST_PDF = '[Product] requesting pdf',
		MERGE = '[Product] Merging'
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

	static setPending() {
		return {
			type: ActionType.SET_PENDING
		};
	}

	static patch(patch: Patch) {
		return {
			type: ActionType.PATCH,
			payload: patch
		};
	}

	static requestPdf(id: string) {
		return {
			type: ActionType.REQUEST_PDF,
			payload: id
		};
	}

}
