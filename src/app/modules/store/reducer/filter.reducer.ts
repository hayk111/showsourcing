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
			FilterTarget.productStatus,
			FilterTarget.price
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
	if (action.type === ActionType.ADD_FILTER || action.type === ActionType.REMOVE_FILTER
			|| action.type === ActionType.SET_FILTER_PRICE) {
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
			group.filters = group.filters.filter(e => (e.value !== id || e.target !== target));
			return { ...state };
		case ActionType.SET_FILTER_PRICE:
			// first we get all filter for this category (ultimately there should be at most 1 though)
			const priceFilter = group.filters.filter(e =>  e.target === target);
			// if there is none we create one, if there is one (or more) we change its value
			if (priceFilter.length > 0)
				priceFilter.forEach(c => c.value = action.payload.val);
			else{
				const v = { target: 'price', name: `min ${action.payload.val[0]}, max ${action.payload.val[1]}`, value: action.payload.val};
				group.filters = group.filters.concat(v);
			}
			return { ...state };
		case ActionType.CLEAR:
			const gName = action.payload;
			const returned = { ...state };
			returned[gName].filters = [];
			return returned;
		default: return state;
	}
}
