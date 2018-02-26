import { TypedAction } from '../../utils/typed-action.interface';
import { ActionType } from '../../action/ui/view-switcher.action';




export const initialState = 'card';

export function viewSwitcherReducer(state: 'list' | 'card' = initialState,
																		action: TypedAction<'list' | 'card'>): 'list' | 'card' {
	if (action.type === ActionType.SWITCH_VIEW_TYPE) {
		return action.payload;
	}
	return state;
}
