import { TypedAction } from '~utils';
import { FilterPanelActionType as ActionType } from '../actions';

const initialState = {
	open: false,
};

export function filterPanelReducer(state = initialState,
																		action: TypedAction<any>) {
	switch (action.type) {
		case ActionType.OPEN:
			return {
				open: true,
			};
		case ActionType.CLOSE:
			return {
				open: false,
			};
		default:
			return state;
	}
}
