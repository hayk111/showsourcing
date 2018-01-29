import { Tag } from '../../model/entities/tag.model';

export enum ActionType {
	LOAD = '[TagSelection] loading',
	ADD = '[TagSelection] adding',
	REMOVE = '[TagSelection] removing for selection',
	RESET = '[TagSelection] resetting',
}

export class TagSlctnActions {
	static load() {
		return {
			type: ActionType.LOAD
		};
	}

	static add(tags: Array<Tag>) {
		return {
			type: ActionType.ADD,
			payload: tags
		};
	}

	static reset() {
		return {
			type: ActionType.RESET
		};
	}

	static remove(tag: Tag) {
		return {
			type: ActionType.REMOVE,
			payload: tag
		};
	}
}
