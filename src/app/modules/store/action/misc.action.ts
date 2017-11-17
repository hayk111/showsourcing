import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';

// miscellaneous state, contains all small state to not create a reducer for
// every small state
export enum ActionType {
	SET_PROPERTY = '[Misc] setting property',
}

export class MiscActions {
		static setProperty(target: string, property: string, value: any): TypedAction<any> {
				return {
						type: ActionType.SET_PROPERTY,
						payload: { target, property, value }
				};
		}
}
