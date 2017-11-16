import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';


export enum ActionType {
	SET_PROPERTY = '[Panel] setting property',
}

export class PanelActions {
		static setProperty(panel: string, property: string, value: any): TypedAction<any> {
				return {
						type: ActionType.SET_PROPERTY,
						payload: { panel, property, value }
				};
		}
}
