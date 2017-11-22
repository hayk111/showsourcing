import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';
import { AppFilters, Filter, FilterGroupName, EntityRepresentation } from '../model/filter.model';

export enum ActionType {
	ADD_FILTER = '[Filters] adding',
	REMOVE_FILTER = '[Filters] removing',
	SET_FILTER_PRICE = '[Filters] setting price',
	CLEAR = '[Filter] clear'
}

export interface FilterArg {
	filterName: string;
	filters: Array<Filter>;
}

export class FilterActions {
		static addFilter(filterGroupName: FilterGroupName, entityRepr: EntityRepresentation, name: string, id: string)
		: TypedAction<{filterGroupName: FilterGroupName, entityRepr: EntityRepresentation, name: string, id: string}> {
				return {
						type: ActionType.ADD_FILTER,
						payload: { filterGroupName, entityRepr, name, id }
				};
		}

		static removeFilter(filterGroupName: FilterGroupName, entityRepr: EntityRepresentation, id: string)
			: TypedAction<{filterGroupName: FilterGroupName, entityRepr: EntityRepresentation, id: string}> {
			return {
				type: ActionType.REMOVE_FILTER,
				payload: {filterGroupName, entityRepr, id}
			};
		}

		static setFilterPrice(filterGroupName: FilterGroupName, entityRepr: EntityRepresentation, val: any) {
			return {
				type: ActionType.SET_FILTER_PRICE,
				payload: { val, entityRepr, filterGroupName }
			};
		}

		static clearGroup(filterGroupName: FilterGroupName) {
			return {
				type: ActionType.CLEAR,
				payload: filterGroupName
			};
		}

}
