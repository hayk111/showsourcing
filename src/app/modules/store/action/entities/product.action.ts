import { Action } from '@ngrx/store';
import { Product } from '../../model/entities/product.model';
import { AppComment } from '../../model/entities/comment.model';
import { Project } from '../../model/entities/project.model';
import { Tag } from '../../model/entities/tag.model';
import { EntityTarget } from '../../utils/entities.utils';
import { Task } from '../../model/entities/task.model';

export enum ActionType {
		LOAD = '[Product] loading',
		ADD = '[Product] adding',
		PATCH = '[Product] patching',
		REQUEST_PDF = '[Product] requesting pdf',

		// comments
		LOAD_COMMENTS = '[Product] Loading comments',
		ADD_COMMENTS = '[Product] adding comments ids',
		CREATE_COMMENT = '[Product] creating comment',
		REMOVE_COMMENT = '[Product] remove comment',
		// project
		LOAD_PROJECT = '[Product] loading projects',
		ADD_PROJECTS = '[Product] adding projects ids',
		REMOVE_PROJECT = '[Product] removing project id',
		// tags
		LOAD_TAGS = '[Product] loading tags',
		ADD_TAGS = '[Product] adding tags ids',
		REMOVE_TAG = '[Product] removing tag id',
		// task
		LOAD_TASKS = '[Product] loading tasks',
		ADD_TASKS = '[Product] adding tasks ids',
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

	static patch(id: string, propName: string, value: any) {
		return {
			type: ActionType.PATCH,
			payload: { id, propName, value }
		};
	}

	static requestPdf(id: string) {
		return {
			type: ActionType.REQUEST_PDF,
		};
	}

	static loadComments() {
		return {
			type: ActionType.LOAD_COMMENTS
		};
	}

	static addComments(added: Array<AppComment>, target: EntityTarget) {
		return {
			type: ActionType.ADD_COMMENTS,
			payload: { added, target, propName: 'commentIds' }
		};
	}

	static createComment(comment: AppComment) {
		return {
			type: ActionType.CREATE_COMMENT,
			payload: comment
		};
	}

	static removeComment(comment: Comment, target: EntityTarget) {
		return {
			type: ActionType.REMOVE_COMMENT,
			payload: { comment, target, propName: 'commentIds' }
		};
	}

	static loadProjects() {
		return {
			type: ActionType.LOAD_PROJECT
		};
	}

	static addProjects(added: Array<Project>, target: EntityTarget) {
		return {
			type: ActionType.ADD_PROJECTS,
			payload: { added, target, propName: 'projectIds' }
		};
	}

	static removeProject(removed: Project, target: EntityTarget) {
		return {
			type: ActionType.REMOVE_PROJECT,
			payload: { removed, target, propName: 'projectIds' }
		};
	}

	static loadTags() {
		return {
			type: ActionType.LOAD_TAGS
		};
	}

	static addTags(added: Array<Tag>, target: EntityTarget) {
		return {
			type: ActionType.ADD_TAGS,
			payload: { added, target, propName: 'tagIds' }
		};
	}

	static removeTag(removed: Tag, target: EntityTarget) {
		return {
			type: ActionType.REMOVE_TAG,
			payload: { removed, target, propName: 'tagIds'}
		};
	}
}
