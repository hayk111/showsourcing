import { AppComment } from '../model/comment.model';
import { EntityRepresentation } from '../model/filter.model';
import { EntityTarget } from '../utils/entities.utils';



export enum ActionType {
	LOAD = '[Comment] loading',
	SET = '[Comment] setting (keeping pendings)',
	ADD_NEW = '[Comment] Adding new',
	ADD_PENDING = '[Comment] Adding pending',
	SET_READY = '[Comment] Setting Ready',
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

	static addNew(comment: AppComment) {
		return {
			type: ActionType.ADD_NEW,
			payload: comment
		};
	}

	static addPending(comment: AppComment) {
		return {
			type: ActionType.ADD_PENDING,
			payload: comment
		};
	}

	static setReady(id: string, replacing: AppComment) {
		return {
			type: ActionType.SET_READY,
			payload: { id, replacing }
		};
	}
}
