import { Action } from '@ngrx/store';
import { TypedAction } from '../../utils/typed-action.interface';
import { Patch } from '../../utils/patch.interface';

export enum ActionType {
	LOAD = '[Event] Loading',
	PATCH = '[Event] Patching',
	CREATE = '[Event] Creating',
	ADD = '[Event] Adding',
	DELETE = '[Event] Deleting',
	MERGE = '[Event] Merging'
}

export class EventActions {
	static load(id: string, maxCounter: number) {
		return {
			type: ActionType.LOAD,
			payload: { id, maxCounter }
		};
	}

	static patch(patch: Patch) {
		return {
			type: ActionType.PATCH,
			payload: patch
		};
	}

	static add(payload: Array<Event>): TypedAction<Array<Event>> {
		return {
			type: ActionType.ADD,
			payload
		};
	}

	static merge() {}

}
