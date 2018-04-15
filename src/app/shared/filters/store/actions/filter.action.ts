import { TypedAction } from '~utils';
import { Filter, FilterGroupName } from '../../models';

export enum FilterActionType {
	ADD_FILTER = '[Filters] adding',
	UPSERT_FILTER = '[Filter] upserting',
	REMOVE_FILTER = '[Filters] removing',
	REMOVE_FILTER_TYPE = '[Filters] removing filter type',
	CLEAR = '[Filter] clear'
}

export class FilterActions {
	static addFilter(filter: Filter, filterGroupName: FilterGroupName)
		: TypedAction<any> {
		return {
			type: FilterActionType.ADD_FILTER,
			payload: { filter, filterGroupName }
		};
	}

	static upsert(filter: Filter, filterGroupName: FilterGroupName) {
		return {
			type: FilterActionType.UPSERT_FILTER,
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

	static removeFilterType(type: string, filterGroupName: FilterGroupName)
		: TypedAction<any> {
		return {
			type: FilterActionType.REMOVE_FILTER_TYPE,
			payload: { type, filterGroupName }
		};
	}

	static clearGroup(filterGroupName: FilterGroupName) {
		return {
			type: FilterActionType.CLEAR,
			payload: filterGroupName
		};
	}

}
