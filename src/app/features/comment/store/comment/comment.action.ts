import { makeEntityBundle } from '~app/entity/store/entity-bundle';
import { ERM, EntityTarget } from '~app/entity/store/entity.model';
import { EntityActions, EntityActionTypes } from '~app/entity/store/entity.action.factory';
import { AppComment } from './comment.model';

export const fromComment = makeEntityBundle(ERM.comment.entityName);

export enum CommentActionTypes {
	LOAD = '[Comment] Loading...',
	SET = '[Comment] Setting...',
	CREATE = '[Comment] Creating...',
	REPLACE = '[Comment] Replacing...',
	REMOVE = '[Comment] Removing...'
}

export class CommentActions {
	static load() {
		return {
			type: CommentActionTypes.LOAD
		};
	}

	static set(comments: Array<AppComment>) {
		return {
			type: CommentActionTypes.SET,
			payload: comments
		};
	}

	static create(comment: AppComment) {
		return {
			type: CommentActionTypes.CREATE,
			payload: comment
		};
	}

	static replace(comment: AppComment) {
		return {
			type: CommentActionTypes.REPLACE,
			payload: comment
		};
	}

	static remove(id: string) {
		return {
			type: CommentActionTypes.REMOVE,
			payload: id
		};
	}
}

