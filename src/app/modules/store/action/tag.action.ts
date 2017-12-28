import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';
import { Tag } from '../model/tag.model';

export enum ActionType {
	LOAD = '[Tag] Loading',
	ADD_TAGS = '[Tag] adding',
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

}
