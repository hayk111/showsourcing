import { TypedAction } from '../../utils/typed-action.interface';
import { ActionType } from '../../action/ui/filter-panel.action';

export const initialState = {
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
