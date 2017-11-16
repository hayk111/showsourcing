import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';

export enum ActionType {
		SET_EVENTS = '[Event] setting',
}

export class EventActions {
		static setEvents(payload: Array<Event>): TypedAction<Array<Event>> {
				return {
						type: ActionType.SET_EVENTS,
						payload
				};
		}

}
