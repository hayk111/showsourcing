import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter, FilterService, FilterType } from '~core/filters';
import { Typename, api } from 'showsourcing-api-lib';

@Component({
	selector: 'filters-app',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
	view: 'BTNS' | 'SELECTION' = 'BTNS';
	@Input() filterTypes = [];
	@Input() sidePanel = true;
	@Input() typenameFiltered: Typename;
	typeSelected: FilterType;

	bridgeFilters: Partial<
		Record<Typename, Partial<Record<FilterType, { bridgeTypename; searchProp; resultProp }>>>
	> = {
		Product: {
			[FilterType.TAG]: {
				bridgeTypename: 'ProductTag',
				searchProp: 'tag',
				resultProp: 'product',
			},
		},
	};

	constructor(public filterSrv: FilterService) {}

	@Output() close = new EventEmitter<undefined>();

	openEditPanel(type: FilterType) {
		this.typeSelected = type;
		this.view = 'SELECTION';
	}

	openBtnPanel() {
		this.view = 'BTNS';
	}

	addFilter(filter: Filter) {
		let newFilters = [...this.filterSrv.filters, filter];

		newFilters = this._addBridgeFilters(newFilters, false);

		this.filterSrv.setFilters(newFilters);
	}

	removeFilter(filter: Filter) {
		let newFilters = this.filterSrv.filters.filter(
			fltr => fltr.type !== filter.type || fltr.value !== filter.value
		);

		newFilters = this._addBridgeFilters(newFilters, true);

		this.filterSrv.setFilters(newFilters);
	}

	/** add bridge filter for many to many relations (e.g. Product => tag type will query ProductTag ids then add the product ids as filter) */
	_addBridgeFilters(newFilters: Filter[], isRemoving: boolean) {
		if (this.bridgeFilters[this.typenameFiltered]?.[this.typeSelected]) {
			const { bridgeTypename, resultProp, searchProp } = this.bridgeFilters[
				this.typenameFiltered
			]?.[this.typeSelected];
			// TODO add a foreach bridgeType => to work with projectProduct
			newFilters = newFilters.filter(_filter => _filter.type !== FilterType.ID);
			const bridgeFilters = newFilters.filter(_filter => _filter.type === this.typeSelected);
			if (!bridgeFilters.length) {
				return newFilters;
			}
			const bridgeIds = bridgeFilters.reduce((ids, _filter) => {
				_filter.ignoreForQuery = true;
				ids.push(_filter.value);
				return ids;
			}, []);
			const entitiesBridge = api[bridgeTypename].findLocal({
				filter: { property: searchProp, inStrings: bridgeIds },
			});
			const bridgeFilter: Partial<Filter> = {};
			bridgeFilter.type = FilterType.ID;
			bridgeFilter.equality = 'inStrings';
			bridgeFilter.value = entitiesBridge.map(entity => entity[resultProp]?.id);
			newFilters.push(bridgeFilter as Filter);
		}
		return newFilters;
	}

	resetAll() {
		this.filterSrv.reset();
	}

	resetType(type: FilterType) {
		this.filterSrv.removeFilterType(type);
	}
}
