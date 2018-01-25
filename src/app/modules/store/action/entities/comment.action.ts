import { EntityTarget } from '../../utils/entities.utils';
import { AppComment } from '../../model/entities/comment.model';



export enum ActionType {
	CREATE = '[Comment] Creating new',
	ADD = '[Comment] Adding',
	REPLACE = '[Comment] Replacing',
}

export class CommentActions {

	static create(comment: AppComment) {
		return {
			type: ActionType.CREATE,
			payload: comment
		};
	}


	static add(added: Array<AppComment>) {
		return {
			type: ActionType.ADD,
			payload: added
		};
	}


	static replace(old: AppComment, replacing: AppComment) {
		return {
			type: ActionType.REPLACE,
			payload: { old, replacing }
		};
	}

}
