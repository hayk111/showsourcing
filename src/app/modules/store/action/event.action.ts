import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';

export enum ActionType {
	LOAD = '[Event] Loading',
	ADD_EVENTS = '[Event] adding',
}

export class EventActions {
	static load(id: string, maxCounter: number) {
		return {
			type: ActionType.LOAD,
			payload: { id, maxCounter }
		};
	}

	static addEvents(payload: Array<Event>): TypedAction<Array<Event>> {
		return {
			type: ActionType.ADD_EVENTS,
			payload
		};
	}

}
