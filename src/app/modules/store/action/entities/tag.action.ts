import { Action } from '@ngrx/store';
import { TypedAction } from '../../utils/typed-action.interface';
import { EntityTarget } from '../../utils/entities.utils';
import { Tag } from '../../model/entities/tag.model';

export enum ActionType {
	LOAD = '[Tag] Loading...',
	ADD = '[Tag] Adding',
	CREATE = '[Tag] Creating new',
	REPLACE = '[Tag] Replacing pending',
}

export class TagActions {

	static load(id: string, maxCounter: number) {
		return {
			type: ActionType.LOAD,
			payload: { id, maxCounter }
		};
	}

	static add(payload: Array<Tag>) {
		return {
		type: ActionType.ADD,
			payload
		};
	}

	static create(projects: Array<Tag>) {
		return {
			type: ActionType.CREATE,
			payload: projects
		};
	}

	static replace(id: string, replacing: Tag) {
		return {
			type: ActionType.REPLACE,
			payload: { id, replacing }
		};
	}

}
