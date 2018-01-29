import { Action } from '@ngrx/store';
import { TypedAction } from '../../utils/typed-action.interface';
import { Tag } from '../../model/entities/tag.model';
import { EntityTarget } from '../../utils/entities.utils';

export enum ActionType {
	LOAD = '[Tag] Loading',
	ADD_TAGS = '[Tag] adding',
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

	static addTags(payload: Array<Tag>): TypedAction<Array<Tag>> {
		return {
			type: ActionType.ADD_TAGS,
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
