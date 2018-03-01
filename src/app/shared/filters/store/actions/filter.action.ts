import { TypedAction } from '~store/utils/typed-action.interface';
import { Filter, FilterGroupName, FilterClass } from '../../models';

export enum FilterActionType {
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
						type: FilterActionType.ADD_FILTER,
						payload: { filter, filterGroupName }
				};
		}

		static removeFilter(filter: Filter, filterGroupName: FilterGroupName)
			: TypedAction<any> {
			return {
				type: FilterActionType.REMOVE_FILTER,
				payload: { filter, filterGroupName }
			};
		}

		static removeFiltersForFilterClass(filterGroupName: FilterGroupName, filterClass: FilterClass) {
			return {
				type: FilterActionType.REMOVE_FILTER_FOR_CLASS,
				payload: { filterGroupName, filterClass }
			};
		}

		static clearGroup(filterGroupName: FilterGroupName) {
			return {
				type: FilterActionType.CLEAR,
				payload: filterGroupName
			};
		}

}
