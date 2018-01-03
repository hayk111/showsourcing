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
		LOAD_BY_ID = '[Product] loading by id',
		SET_PENDING = '[Product] pending',
		SET = '[Product] setting',
		ADD = '[Product] adding',
		PATCH = '[Product] patching',
		LOAD_TAGS = '[Product] loading tags',
		SET_TAGS = '[Product] setting tags',
		ADD_TAG = '[Product] adding tag',
		REMOVE_TAG = '[Product] removing tag',
		LOAD_PROJECTS = '[Product] loading projects',
		SET_PROJECTS = '[Product] setting projects',
		ADD_PROJECT = '[Product] adding project',
		REMOVE_PROJECT = '[Product] removing project',
		LOAD_TASKS = '[Product] loading tasks',
		SET_TASKS = '[Product] setting tasks',
		ADD_TASK = '[Product] adding tasks',
		REMOVE_TASK = '[Product] removing tasks',
		REQUEST_PDF = '[Product] requesting pdf'
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

	static setTags(tags: Array<Tag>, id: string) {
		return {
			type: ActionType.SET_TAGS,
			payload: { tags, id }
		};
	}

	static addTag(tag: Tag, id: string) {
		return {
			type: ActionType.ADD_TAG,
			payload: { tag, id }
		};
	}

	static removeTag(tag: Tag, id: string) {
		return {
			type: ActionType.REMOVE_TAG,
			payload: { tag, id }
		};
	}


	static loadProjects(id: string) {
		return {
			type: ActionType.LOAD_PROJECTS,
			payload: id
		};
	}

	static setProjects(projects: Array<Project>, id: string) {
		return {
			type: ActionType.SET_PROJECTS,
			payload: { projects, id }
		};
	}

	static addProject(project: Project, id: string) {
		return {
			type: ActionType.ADD_PROJECT,
			payload: { id, project }
		};
	}

	static removeProject(project: Project, id: string) {
		return {
			type: ActionType.REMOVE_PROJECT,
			payload: { project, id }
		};
	}

	static loadTasks(id: string) {
		return {
			type: ActionType.LOAD_TASKS,
			payload: id
		};
	}

	static requestPdf(id: string) {
		return {
			type: ActionType.REQUEST_PDF,
			payload: id
		};
	}

}
