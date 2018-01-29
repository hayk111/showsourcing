import { Action } from '@ngrx/store';
import { Product } from '../../model/entities/product.model';
import { TypedAction } from '../../utils/typed-action.interface';
import { AppComment } from '../../model/entities/comment.model';
import { FilterGroupName } from '../../model/misc/filter.model';
import { AppFile } from '../../model/entities/app-file.model';
import { Tag } from '../../model/entities/tag.model';
import { Project } from '../../model/entities/project.model';
import { Task } from '../../model/entities/task.model';

export enum ActionType {
		LOAD = '[Product] loading',
		SET_PENDING = '[Product] pending',
		ADD = '[Product] adding',
		PATCH = '[Product] patching',
		REQUEST_PDF = '[Product] requesting pdf',
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
