import { TypedAction } from '../utils/typed-action.interface';
import { ActionType, FilterArg } from '../action/filter.action';
import { AppFilters, FilterGroupName, FilterTarget } from '../model/filter.model';
import { deepCopy } from '../utils/deep-copy.utils';
import { selectFilterCategory, selectFilterGroup } from '../selectors/filter.selectors';

export const initialState: AppFilters = {
	productsPage: {
		targets: [
			FilterTarget.suppliers, 
			FilterTarget.categories, 
			FilterTarget.events, 
			FilterTarget.tags,
			FilterTarget.projects,
			FilterTarget.productStatus
		],
		filters: []
	},
	tasksPage: {
		targets: [],
		filters: []
	}
};

export function filtersReducer(state: AppFilters = initialState, action: TypedAction<any> ): AppFilters {
	let groupName, target, group, id, name;
	if (action.type === ActionType.ADD_FILTER || action.type === ActionType.REMOVE_FILTER) {
		groupName = action.payload.filterGroupName;
		target = action.payload.target;
		group = state[groupName];
		id = action.payload.id;
		name = action.payload.name;
	}

	switch (action.type) {
		case ActionType.ADD_FILTER:
			group.filters = group.filters.concat({target, name, value: id});
			return { ...state };
		case ActionType.REMOVE_FILTER:
			group.filters = group.filters.filter(e => e.value !== id);
			return { ...state };
		case ActionType.CLEAR:
			const gName = action.payload;
			const returned = { ...state };
			returned[gName].filters = [];
			return returned;
		default: return state;
	}
}
