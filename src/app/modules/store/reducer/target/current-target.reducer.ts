import { ActionType } from '../../action/target/current-target.action';


export function currentTargetReducer(state, action) {
	switch (action.type) {
		case ActionType.SET:
			return action.payload;
		default: return state;
	}
}
