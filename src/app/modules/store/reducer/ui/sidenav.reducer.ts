import { ActionType } from '../../action/ui/sidenav.reducer';


export function sidenavReducer(state = true, action) {
	switch (action.type) {
		case ActionType.OPEN:
			return true;
		case ActionType.CLOSE:
			return false;
		case ActionType.TOGGLE:
			return !state;
		default: return state;
	}
}
