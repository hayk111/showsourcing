import { AppComment } from '../model/comment.model';
import { EntityRepresentation } from '../model/filter.model';
import { EntityTarget } from '../utils/entities.utils';



export enum ActionType {
	LOAD = '[Comment] loading',
	SET = '[Comment] setting (keeping pendings)',
	CLEAR = '[Comment] clearing'
}


export class CommentActions {

	static load(target: EntityTarget) {
		return {
			type: ActionType.LOAD,
			payload: target
		};
	}

	static setComments(comments: Array<AppComment>) {
		return {
			type: ActionType.SET,
			payload: comments
		};
	}

	static clear() {
		return {
			type: ActionType.CLEAR
		};
	}
}
