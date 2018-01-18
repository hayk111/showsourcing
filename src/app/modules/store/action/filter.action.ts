import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';
import { AppFilters, Filter, FilterGroupName, FilterClass } from '../model/filter.model';

export enum ActionType {
	ADD_FILTER = '[Filters] adding',
	REMOVE_FILTER = '[Filters] removing',
	REMOVE_FILTER_FOR_CLASS = '[Filters] removing all specific filters',
	CLEAR = '[Filter] clear'
}

export interface FilterArg {
	filterName: string;
	filters: Array<Filter>;
}

export class FilterActions {
		static addFilter(filter: Filter, filterGroupName: FilterGroupName)
		: TypedAction<any> {
				return {
						type: ActionType.ADD_FILTER,
						payload: { filter, filterGroupName }
				};
		}

		static removeFilter(filter: Filter, filterGroupName: FilterGroupName)
			: TypedAction<any> {
			return {
				type: ActionType.REMOVE_FILTER,
				payload: { filter, filterGroupName }
			};
		}

		static removeFiltersForFilterClass(filterGroupName: FilterGroupName, filterClass: FilterClass) {
			return {
				type: ActionType.REMOVE_FILTER_FOR_CLASS,
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
