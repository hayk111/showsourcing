import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';

export enum ActionType {
	LOAD = '[Event] Loading',
	SET_EVENTS = '[Event] setting',
}

export class EventActions {
	static load(maxCounter) {
		return {
			type: ActionType.LOAD,
			payload: maxCounter
		};
	}

	static setEvents(payload: Array<Event>): TypedAction<Array<Event>> {
		return {
			type: ActionType.SET_EVENTS,
			payload
		};
	}

}
