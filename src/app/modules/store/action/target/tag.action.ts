import { EntityTarget } from '../../utils/entities.utils';
import { Tag } from '../../model/tag.model';


export enum ActionType {
	LOAD = '[Target-Tag] loading',
	SET = '[Target-Tag] setting',
	ADD = '[Target-Tag] adding',
	REMOVE = '[Target-Tag] removing',
	SET_PENDING = '[Target-Tag] set pending',
}

export class TargetTagActions {

	static load(target: EntityTarget) {
		return {
			type: ActionType.LOAD,
			payload: target
		};
	}
	// we are setting only ids here.
	static set(tags: Array<string>) {
		return {
			type: ActionType.SET,
			payload: tags
		};
	}

	static add(tag: Tag, target: EntityTarget) {
		return {
			type: ActionType.ADD,
			payload: { tag, target }
		};
	}

	static remove(tag: Tag, target: EntityTarget) {
		return {
			type: ActionType.REMOVE,
			payload: { tag, target }
		};
	}

	static setPending() {
		return {
			type: ActionType.SET_PENDING
		};
	}
}
