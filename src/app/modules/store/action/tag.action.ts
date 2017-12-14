import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';
import { Tag } from '../model/tag.model';

export enum ActionType {
	LOAD = '[Tag] Loading',
	SET_TAGS = '[Tag] setting',
}

export class TagActions {

	static load(maxCounter) {
		return {
			type: ActionType.LOAD,
			payload: maxCounter
		};
	}

	static setTags(payload: Array<Tag>): TypedAction<Array<Tag>> {
		return {
			type: ActionType.SET_TAGS,
			payload
		};
	}

}
