import { TypedAction } from '../utils/typed-action.interface';
import { ActionType, FilterArg } from '../action/filter.action';
import { AppFilters, FilterGroupName, FilterTarget } from '../model/filter.model';
import { deepCopy } from '../utils/deep-copy.utils';
import { selectFilterCategory, selectFilterGroup } from '../selectors/filter.selectors';

export const initialState: AppFilters = {
	productsPage: {
		// TODO : Are those targets even used anymore ?
		targets: [
			FilterTarget.suppliers,
			FilterTarget.categories,
			FilterTarget.events,
			FilterTarget.tags,
			FilterTarget.projects,
			FilterTarget.productStatus,
			FilterTarget.prices,
			FilterTarget.ratings
		],
		filters: []
	},
	tasksPage: {
		targets: [],
		filters: []
	},
	supplierPage: {
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
			// first we remove current price filter
			group.filters = group.filters.filter(f => f.target !== target);
			// if there is none we create one, if there is one we change its value
			const val = action.payload.val;
			const nameValue = `${target === FilterTarget.minPrices ? 'min' : 'max'} : ${val}`;
			const v = { target, name: nameValue, value: action.payload.val};
			group.filters = group.filters.concat(v);
			return { ...state };
		case ActionType.CLEAR:
			const gName = action.payload;
			const returned = { ...state };
			returned[gName].filters = [];
			return returned;
		default: return state;
	}
}
