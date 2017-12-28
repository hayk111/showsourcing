import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';
import { AppFilters, Filter, FilterGroupName, FilterRepresentation } from '../model/filter.model';

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
		static addFilter(filterGroupName: FilterGroupName, filterRepr: FilterRepresentation, name: string, value: any)
		: TypedAction<{filterGroupName: FilterGroupName, filterRepr: FilterRepresentation, name: string, value: any}> {
				return {
						type: ActionType.ADD_FILTER,
						payload: { filterGroupName, filterRepr, name, value }
				};
		}

		static removeFilter(filterGroupName: FilterGroupName, filterRepr: FilterRepresentation, value: any)
			: TypedAction<{filterGroupName: FilterGroupName, filterRepr: FilterRepresentation, value: any}> {
			return {
				type: ActionType.REMOVE_FILTER,
				payload: {filterGroupName, filterRepr, value}
			};
		}

		static removeFiltersForEntityReprs(filterGroupName: FilterGroupName, entityReprArr: Array<FilterRepresentation>) {
			return {
				type: ActionType.REMOVE_FILTER_ARRAY,
				payload: { filterGroupName, entityReprArr }
			};
		}
		static clearGroup(filterGroupName: FilterGroupName) {
			return {
				type: ActionType.CLEAR,
				payload: filterGroupName
			};
		}

}
