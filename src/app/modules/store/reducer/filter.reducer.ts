import { TypedAction } from '../utils/typed-action.interface';
import { ActionType, FilterArg } from '../action/filter.action';
import { AppFilters, FilterGroupName, entityRepresentationMap } from '../model/filter.model';
import { deepCopy } from '../utils/deep-copy.utils';
import { selectFilterGroup } from '../selectors/filter.selectors';

export const initialState: AppFilters = {
	productsPage: [],
	tasksPage: [],
	supplierPage: [],
	eventsPage: []
};

export function filtersReducer(state: AppFilters = initialState, action: TypedAction<any> ): AppFilters {
	let groupName, entityRepr, group, id, name;
	// getting some vars ready that are used in many places
	if (action.type === ActionType.ADD_FILTER || action.type === ActionType.REMOVE_FILTER
			|| action.type === ActionType.SET_FILTER_PRICE) {
		groupName = action.payload.filterGroupName;
		entityRepr = action.payload.entityRepr;
		group = state[groupName];
		id = action.payload.id;
		name = action.payload.name;
	}

	switch (action.type) {
		case ActionType.ADD_FILTER:
			state[groupName] = group.concat({entityRepr, name, value: id});
			return { ...state };
		case ActionType.REMOVE_FILTER:
			state[groupName] = group.filter(e => (e.value !== id || e.entityRepr !== entityRepr));
			return { ...state };
		case ActionType.SET_FILTER_PRICE:
			// first we remove current price filter
			group.filters = group.filters.filter(f => f.target !== entityRepr);
			// if there is none we create one, if there is one we change its value
			const val = action.payload.val;
			const nameValue = `${entityRepr === entityRepresentationMap.minPrices ? 'min' : 'max'} : ${val}`;
			const v = { entityRepr, name: nameValue, value: action.payload.val};
			group.filters = group.filters.concat(v);
			return { ...state };
		case ActionType.CLEAR:
			const gName = action.payload;
			const returned = { ...state };
			returned[gName] = [];
			return returned;
		default: return state;
	}
}
