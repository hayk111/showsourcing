import { TypedAction } from '../utils/typed-action.interface';
import { ActionType, FilterArg } from '../action/filter.action';
import { AppFilters, FilterGroupName, entityRepresentationMap, EntityRepresentation } from '../model/filter.model';
import { deepCopy } from '../utils/deep-copy.utils';
import { selectFilterGroup } from '../selectors/filter.selectors';

export const initialState: AppFilters = {
	productsPage: [],
	tasksPage: [],
	supplierPage: [],
	eventsPage: []
};

export function filtersReducer(state: AppFilters = initialState, action: TypedAction<any> ): AppFilters {
	let groupName, entityRepr, group, value, name, newState;
	// getting some vars ready that are used in many places
	if (action.type === ActionType.ADD_FILTER || action.type === ActionType.REMOVE_FILTER
			|| action.type === ActionType.REMOVE_FILTER_ARRAY) {
		groupName = action.payload.filterGroupName;
		entityRepr = action.payload.entityRepr;
		group = state[groupName];
		value = action.payload.value;
		name = action.payload.name;
	}

	switch (action.type) {
		case ActionType.ADD_FILTER:
			newState = { ...state };
			newState[groupName] = group.concat({entityRepr, name, value});
			return newState;
		case ActionType.REMOVE_FILTER:
			newState = { ...state };
			newState[groupName] = group.filter(e => (e.value !== value || e.entityRepr !== entityRepr));
			return newState;
		case ActionType.REMOVE_FILTER_ARRAY:
			newState = { ...state };
			const arr = action.payload.entityReprArr;
			newState[groupName] = group.filter(e => !arr.includes(e.entityRepr));
			return newState;
		case ActionType.CLEAR:
			const gName = action.payload;
			const returned = { ...state };
			returned[gName] = [];
			return returned;
		default: return state;
	}
}
