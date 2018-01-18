import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';
import { AppFilters, Filter, FilterGroupName, FilterClass } from '../model/filter.model';

export enum ActionType {
	ADD_FILTER = '[Filters] adding',
	REMOVE_FILTER = '[Filters] removing',
	REMOVE_FILTER_ARRAY = '[Filters] removing all filters for filterRepr Array',
	CLEAR = '[Filter] clear'
}

export interface FilterArg {
	filterName: string;
	filters: Array<Filter>;
}

export class FilterActions {
		static addFilter(filter: Filter)
		: TypedAction<Filter> {
				return {
						type: ActionType.ADD_FILTER,
						payload: filter
				};
		}

		static removeFilter(filter: Filter)
			: TypedAction<Filter> {
			return {
				type: ActionType.REMOVE_FILTER,
				payload: filter
			};
		}

		static removeFiltersForFilterClass(filterGroupName: FilterGroupName, filterClass: FilterClass) {
			return {
				type: ActionType.REMOVE_FILTER_ARRAY,
				payload: { filterGroupName, filterClass }
			};
		}

		static clearGroup(filterGroupName: FilterGroupName) {
			return {
				type: ActionType.CLEAR,
				payload: filterGroupName
			};
		}

}
