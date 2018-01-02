import { Action } from '@ngrx/store';
import { Product } from '../model/product.model';
import { TypedAction } from '../utils/typed-action.interface';
import { AppComment } from '../model/comment.model';
import { FilterGroupName } from '../model/filter.model';
import { AppFile } from '../model/app-file.model';
import { Tag } from '../model/tag.model';
import { Project } from '../model/project.model';

export enum ActionType {
		LOAD = '[Product] loading',
		LOAD_BY_ID = '[Product] loading by id',
		SET_PENDING = '[Product] pending',
		SET = '[Product] setting',
		ADD = '[Product] adding',
		PATCH = '[Product] patching',
		LOAD_TAGS = '[Product] loading tags',
		ADD_TAGS = '[Product] adding tags',
		LOAD_PROJECTS = '[Product] loading projects',
		ADD_PROJECTS = '[Product] adding projects'
}

export class ProductActions {

	static load(filterGroupName?: FilterGroupName) {
		return {
			type: ActionType.LOAD,
			payload: filterGroupName
		};
	}

	static loadOne(id: string) {
		return {
			type: ActionType.LOAD_BY_ID,
			payload: id
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

	static loadTags(id: string) {
		return {
			type: ActionType.LOAD_TAGS,
			payload: id
		};
	}

	static addTags(tags: Array<Tag>, id: string) {
		return {
			type: ActionType.ADD_TAGS,
			payload: { tags, id }
		};
	}


	static loadProjects(id: string) {
		return {
			type: ActionType.LOAD_PROJECTS,
			payload: id
		};
	}

	static addProjects(projects: Array<Project>, id: string) {
		return {
			type: ActionType.ADD_PROJECTS,
			payload: { id, projects }
		};
	}
}
