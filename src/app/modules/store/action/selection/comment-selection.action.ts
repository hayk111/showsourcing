import { AppComment } from '../../model/entities/comment.model';

export enum ActionType {
	LOAD = '[CommentSelection] loading',
	SET = '[CommentSelection] setting',
	ADD = '[CommentSelection] adding',
	REPLACE = '[CommentSelection] replacing',
}

export class CommentSlctnActions {
	static load() {
		return {
			type: ActionType.LOAD
		};
	}

	static set(comments: Array<AppComment>) {
		return {
			type: ActionType.SET,
			payload: comments
		};
	}

	static add(comment: AppComment) {
		return {
			type: ActionType.ADD,
			payload: comment
		};
	}

	static replace(old: AppComment, replacing: AppComment) {
		return {
			type: ActionType.REPLACE,
			payload: { old, replacing }
		};
	}

}
