import { AppComment } from '../../model/entities/comment.model';

export enum ActionType {
	LOAD = '[CommentSelection] loading',
	ADD = '[CommentSelection] adding',
	REPLACE = '[CommentSelection] replacing',
	CREATE = '[CommentSelection] creating',
	RESET = '[CommentSelection] resetting'
}

export class CommentSlctnActions {
	static load() {
		return {
			type: ActionType.LOAD
		};
	}

	static create(comment: AppComment) {
		return {
			type: ActionType.CREATE,
			payload: comment
		};
	}

	static add(comments: Array<AppComment>) {
		return {
			type: ActionType.ADD,
			payload: comments
		};
	}

	static replace(old: AppComment, replacing: AppComment) {
		return {
			type: ActionType.REPLACE,
			payload: { old, replacing }
		};
	}

	static reset() {
		return {
			type: ActionType.RESET
		};
	}
}
