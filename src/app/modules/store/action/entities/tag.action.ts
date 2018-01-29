import { TypedAction } from '../../utils/typed-action.interface';
import { Tag } from '../../model/entities/tag.model';

export enum ActionType {
	LOAD = '[Tag] Loading',
	CREATE = '[Tag] creating',
	ADD = '[Tag] adding',
	PATCH = '[Tag] patching',
	DELETE = '[Tag] deleting'
}

export class TagActions {

	static load(id: string, maxCounter: number) {
		return {
			type: ActionType.LOAD,
			payload: { id, maxCounter }
		};
	}

	static create(tag: Tag) {
		return {
			type: ActionType.CREATE,
			payload: tag
		};
	}

	static add(payload: Array<Tag>): TypedAction<Array<Tag>> {
		return {
			type: ActionType.ADD,
			payload
		};
	}

	static patch(id: string, propName: string, value: any) {
		return {
			type: ActionType.PATCH,
			payload: { id, propName, value }
		};
	}

	static delete(id: string) {
		return {
			type: ActionType.DELETE,
			payload: id
		};
	}

}
