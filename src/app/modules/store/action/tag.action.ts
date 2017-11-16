import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';
import { Tag } from '../model/tag.model';

export enum ActionType {
		SET_TAGS = '[Tag] setting',
}

export class TagActions {
		static setTags(payload: Array<Tag>): TypedAction<Array<Tag>> {
				return {
						type: ActionType.SET_TAGS,
						payload
				};
		}

}
