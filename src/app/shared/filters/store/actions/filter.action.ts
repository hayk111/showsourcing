import { TypedAction } from '~utils';
import { Filter, FilterGroupName } from '../../models';

export enum FilterActionType {
	ADD_FILTER = '[Filters] adding',
	REMOVE_FILTER = '[Filters] removing',
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

	static clearGroup(filterGroupName: FilterGroupName) {
		return {
			type: FilterActionType.CLEAR,
			payload: filterGroupName
		};
	}

}
