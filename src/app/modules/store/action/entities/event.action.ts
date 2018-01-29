import { Action } from '@ngrx/store';
import { TypedAction } from '../../utils/typed-action.interface';

export enum ActionType {
	LOAD = '[Event] Loading',
	PATCH = '[Event] Patching',
	CREATE = '[Event] Creating',
	ADD = '[Event] Adding',
	DELETE = '[Event] Deleting'
}

export class EventActions {
	static load(id: string, maxCounter: number) {
		return {
			type: ActionType.LOAD,
			payload: { id, maxCounter }
		};
	}

	static patch(id: string, propName: string, value: any) {
		return {
			type: ActionType.PATCH,
			payload: { id, propName, value }
		};
	}

	static add(payload: Array<Event>): TypedAction<Array<Event>> {
		return {
			type: ActionType.ADD,
			payload
		};
	}

}
