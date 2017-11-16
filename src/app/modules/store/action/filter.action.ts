import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';
import { AppFilters, Filter } from '../model/filter.model';

export enum ActionType {
	ADD_FILTER = '[Filters] adding',
	REMOVE_FILTER = '[Filters] removing'
}

export interface FilterArg {
	filterName: string;
	filters: Array<Filter>;
}

export class FilterActions {
		static addFilter(filterGroupName: string, target: string, name: string, id: string)
		: TypedAction<{filterGroupName: string, target: string, name: string, id: string}> {
				return {
						type: ActionType.ADD_FILTER,
						payload: { filterGroupName, target, name, id }
				};
		}

		static removeFilter(filterGroupName: string, target: string, id: string)
			: TypedAction<{filterGroupName: string, target: string, id: string}> {
			return {
				type: ActionType.REMOVE_FILTER,
				payload: {filterGroupName, target, id}
			};
		}
}
