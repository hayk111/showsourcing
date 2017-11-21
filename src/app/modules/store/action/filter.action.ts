import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';
import { AppFilters, Filter, FilterGroupName, FilterTarget } from '../model/filter.model';

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
		static addFilter(filterGroupName: FilterGroupName, target: FilterTarget, name: string, id: string)
		: TypedAction<{filterGroupName: FilterGroupName, target: FilterTarget, name: string, id: string}> {
				return {
						type: ActionType.ADD_FILTER,
						payload: { filterGroupName, target, name, id }
				};
		}

		static removeFilter(filterGroupName: FilterGroupName, target: FilterTarget, id: string)
			: TypedAction<{filterGroupName: FilterGroupName, target: FilterTarget, id: string}> {
			return {
				type: ActionType.REMOVE_FILTER,
				payload: {filterGroupName, target, id}
			};
		}

		static setFilterPrice(filterGroupName: FilterGroupName, target: FilterTarget, val: any){
			return {
				type: ActionType.SET_FILTER_PRICE,
				payload:{ val, filterGroupName }
			}
		}

		static clearGroup(filterGroupName: FilterGroupName) {
			return {
				type: ActionType.CLEAR,
				payload: filterGroupName
			}
		}
}
