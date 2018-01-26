import { EntityTarget } from '../../utils/entities.utils';
import { Project } from '../../model/entities/project.model';


export enum ActionType {
	SET = '[Target-Comments] setting',
	ADD = '[Target-Comments] adding',
	REMOVE = '[Target-Comments] removing',
}

export class TargetCommentsActions {

	static set(comments: Array<Comment>) {
		return {
			type: ActionType.SET,
			payload: comments
		};
	}

	static add(comment: Comment, target: EntityTarget) {
		return {
			type: ActionType.ADD,
			payload: { comment, target }
		};
	}

	static remove(comment: Comment, target: EntityTarget) {
		return {
			type: ActionType.REMOVE,
			payload: { comment, target }
		};
	}

}
