import { EntityTarget } from '../../utils/entities.utils';
import { AppComment } from '../../model/entities/comment.model';



export enum ActionType {
	LOAD = '[Comment] Loading...',
	CREATE = '[Comment] Creating new',
	ADD = '[Comment] Adding',
	REPLACE = '[Comment] Replacing pending',
}

export class CommentActions {

	static load(target: EntityTarget) {
		return {
			type: ActionType.LOAD,
			payload: target
		};
	}

	// we need to pass the entity target because the @Effect in
	// some entities like product catch this event to add comments ids to their array
	static add(comments: Array<AppComment>, target: EntityTarget) {
		return {
			type: ActionType.ADD,
			payload: { comments, target }
		};
	}

	static create(comment: AppComment, target: EntityTarget) {
		return {
			type: ActionType.CREATE,
			payload: { comment, target }
		};
	}

	static replace(id: string, replacing: AppComment, target: EntityTarget) {
		return {
			type: ActionType.REPLACE,
			payload: { id, replacing, target }
		};
	}

}
