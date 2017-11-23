import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';
import { AppFilters, Filter, FilterGroupName, EntityRepresentation } from '../model/filter.model';

export enum ActionType {
	ADD_FILTER = '[Filters] adding',
	REMOVE_FILTER = '[Filters] removing',
	REMOVE_FILTER_ARRAY = '[Filters] removing all filters for entityRepr Array',
	CLEAR = '[Filter] clear'
}

export interface FilterArg {
	filterName: string;
	filters: Array<Filter>;
}

export class FilterActions {
		static addFilter(filterGroupName: FilterGroupName, entityRepr: EntityRepresentation, name: string, value: any)
		: TypedAction<{filterGroupName: FilterGroupName, entityRepr: EntityRepresentation, name: string, value: any}> {
				return {
						type: ActionType.ADD_FILTER,
						payload: { filterGroupName, entityRepr, name, value }
				};
		}

		static removeFilter(filterGroupName: FilterGroupName, entityRepr: EntityRepresentation, value: any)
			: TypedAction<{filterGroupName: FilterGroupName, entityRepr: EntityRepresentation, value: any}> {
			return {
				type: ActionType.REMOVE_FILTER,
				payload: {filterGroupName, entityRepr, value}
			};
		}

		static removeFiltersForEntityReprs(filterGroupName: FilterGroupName, entityReprArr: Array<EntityRepresentation>) {
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
