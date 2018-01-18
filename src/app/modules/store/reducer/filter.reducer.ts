import { TypedAction } from '../utils/typed-action.interface';
import { ActionType, FilterArg } from '../action/filter.action';
import { AppFilters, FilterGroupName} from '../model/filter.model';
import { deepCopy } from '../utils/deep-copy.utils';
import { selectFilterGroup } from '../selectors/filter.selectors';

export const initialState: AppFilters = {
	productsPage: [],
	tasksPage: [],
	supplierPage: [],
	eventsPage: []
};

export function filtersReducer(state: AppFilters = initialState, action: TypedAction<any> ): AppFilters {
	let groupName, filter, group, newState;

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

		case ActionType.REMOVE_FILTER:
			newState = { ...state };
			// check readme in the shared/filter module for more info on the instanceof if needed.
			newState[groupName] = group.filter(f => (!f.equals(filter)));
			return newState;

		case ActionType.REMOVE_FILTER_FOR_CLASS:
			newState = { ...state };
			const filterClass = action.payload.filterClass;
			newState[groupName] = group.filter(f => f instanceof filterClass);
			return newState;

		case ActionType.CLEAR:
			const gName = action.payload;
			const returned = { ...state };
			returned[gName] = [];
			return returned;

		default: return state;
	}
}
