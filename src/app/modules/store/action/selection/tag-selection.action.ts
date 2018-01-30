import { Tag } from '../../model/entities/tag.model';

export enum ActionType {
	LOAD = '[TagSelection] loading',
	SET = '[TagSelection]	setting',
	ADD = '[TagSelection] adding',
	REMOVE = '[TagSelection] removing for selection',
}

export class TagSlctnActions {
	static load() {
		return {
			type: ActionType.LOAD
		};
	}

	static set(tag: Tag) {
		return {
			type: ActionType.SET,
			payload: tag
		};
	}

	static add(tags: Array<Tag>) {
		return {
			type: ActionType.ADD,
			payload: tags
		};
	}

	static remove(tag: Tag) {
		return {
			type: ActionType.REMOVE,
			payload: tag
		};
	}
}
