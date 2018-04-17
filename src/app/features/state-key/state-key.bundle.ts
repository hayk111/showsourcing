import { createSelector } from 'reselect';


// State key is a place where we can set whether a form is pending or has an error

export enum StateGroup {
	NEW_SUPPLIER = 'new-supplier',
}

export const initialState = {
	isPending: {
		[StateGroup.NEW_SUPPLIER]: false
	},
	isError: {
		[StateGroup.NEW_SUPPLIER]: false
	}
};

export enum ActionType {
	SET_PENDING = '[StateKey] Setting pending',
	SET_READY = '[StateKey] Setting ready',
	SET_ERROR = '[StateKey] Setting Error',
	RESET = '[StateKey] Resetting'
}

export class Actions {
	static setPending(group: StateGroup) {
		return {
			type: ActionType.SET_PENDING,
			payload: { group }
		};
	}

	static setReady(group: StateGroup) {
		return {
			type: ActionType.SET_READY,
			payload: { group }
		};
	}

	static setError(group: StateGroup, error: any) {
		return {
			type: ActionType.SET_ERROR,
			payload: { group, error }
		};
	}

	static reset(group: StateGroup) {
		return {
			type: ActionType.RESET,
			payload: { group }
		};
	}
}


export function reducer(state = initialState, action) {
	let group;

	if (action.payload)
		group = action.payload.group;

	switch (action.type) {
		case ActionType.SET_PENDING:
			return patchProperty(state, group, 'isPending', true);
		case ActionType.SET_READY:
			return patchProperty(state, group, 'isPending', false);
		case ActionType.SET_ERROR:
			return patchProperty(state, group, 'isError', action.payload.error);
		case ActionType.RESET:
			return initialState;
		default:
			return state;
	}
}

function patchProperty(state, group, propName, value) {
	return {
		...state,
		[propName]: { ...state.isPending, [group]: value }
	};
}


export const selectStateKey = state => state.stateKey;
export const selectPending = (group: StateGroup) => createSelector(
	[selectStateKey], (state) => state.isPending[group]);

export const fromStateKey = {
	Actions,
	reducer,
	selectPending
};

