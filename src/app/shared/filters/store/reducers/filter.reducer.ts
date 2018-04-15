import { TypedAction } from '~utils';

import { AppFilters, Filter } from '../../models';
import { FilterActionType as ActionType } from '../actions';

const initialState: AppFilters = {
	productsPage: [],
	tasksPage: [],
	suppliersPage: [],
	eventsPage: []
};

export function filtersReducer(state: AppFilters = initialState, action: TypedAction<any>): AppFilters {
	let groupName, filter, group: Array<Filter>, newState;

	if (action.payload) {
		groupName = action.payload.filterGroupName;
		filter = action.payload.filter;
		group = state[groupName];
	}

	switch (action.type) {

		case ActionType.ADD_FILTER:
			newState = { ...state };
			newState[groupName] = group.concat(filter);
			return newState;

		// used for search, cannot have 2 search filter at once
		case ActionType.UPSERT_FILTER:
			newState = { ...state };
			newState[groupName] = group.filter(f => f.type !== filter.type).concat(filter);
			return newState;

		case ActionType.REMOVE_FILTER:
			newState = { ...state };
			newState[groupName] = group.filter(f => (f.type !== filter.type || f.value !== filter.value));
			return newState;

		case ActionType.REMOVE_FILTER_TYPE:
			newState = { ...state };
			newState[groupName] = group.filter(f => f.type !== action.payload.type);
			return newState;

		case ActionType.CLEAR:
			const gName = action.payload;
			const returned = { ...state };
			returned[gName] = [];
			return returned;

		default: return state;
	}
}
