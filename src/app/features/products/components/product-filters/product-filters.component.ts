import {
	ChangeDetectionStrategy, Component, OnInit, Input,
	ChangeDetectorRef, Output, EventEmitter
} from '@angular/core';

import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AutoUnsub } from '~app-root/utils';

import { Filter, FilterType, FilterGroup } from '~shared/filters';
import { FilterService } from '~shared/filters/services/filter.service';
import { Entity } from '~models';
import { FilterDataService } from '../../services/filter.data.service';

@Component({
	selector: 'product-filters-app',
	templateUrl: './product-filters.component.html',
	styleUrls: ['./product-filters.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFiltersComponent extends AutoUnsub implements OnInit {
	@Output() filter: EventEmitter<FilterGroup> = new EventEmitter();
	selectedSuppliers$: Observable<any>;
	/** Whether the different panel that are displayed when clicking on a button are shown */
	btnPanelShown = true;
	entityPanelShown = false;
	pricePanelShown = false;
	filterGroup: FilterGroup;

	/** for the entity panel we need to pass the correct entityState */
	choices$: Observable<Array<Entity>>;
	relevantChoices$: Observable<Array<Entity>>;
	typeSelected: FilterType;

	/** Those filter types are displayed exactly the same way on screen */
	basicFilterTypes = [
		FilterType.SUPPLIER,
		FilterType.EVENT,
		FilterType.CATEGORY,
		FilterType.TAG,
		FilterType.PROJECT
	];
	/** Specifies the display name for elements. If it corresponds to "name", don't add entry here */
	displayNames = {

	};
	// different filterTypes
	filterType = FilterType;

	constructor(private filterSrv: FilterService,
				private filterDataSrv: FilterDataService,
				private cd: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.filterSrv.filterGroup$
			.pipe(takeUntil(this._destroy$))
			.subscribe(group => {
				this.filterGroup = group;
				// re-apply filtering of products
				this.filter.emit(group);
				// need to run cd because of onpush and filters could be added from other places
				this.cd.markForCheck();
			});
	}

	/** opens the panel to select an entity */
	toggleEntityPanel(type: FilterType): void {
		this.entityPanelShown = !this.entityPanelShown;
		this.btnPanelShown = !this.entityPanelShown;

		// when shown we need to change the choices displayed
		if (this.entityPanelShown) {
			// we get the correct entity
			// const entityRepr = this.getRepr(type);
			this.typeSelected = type;
			this.choices$ = this.selectEntityArray(type)
				.pipe(takeUntil(this._destroy$));
			// }
			// this.choices$ = this.store.select(selectEntityArray(entityRepr));
			// this.relevantChoices$ = this.store.select(selectRelevantEntities(entityRepr));
		}
	}

	/** Links data for a type of filter type */
	selectEntityArray(type: FilterType) {
		if (type === FilterType.SUPPLIER) {
			return this.filterDataSrv.selectSuppliers();
		}
		if (type === FilterType.EVENT) {
			return this.filterDataSrv.selectEvents();
		}
		if (type === FilterType.CATEGORY) {
			return this.filterDataSrv.selectCategories();
		}
		if (type === FilterType.TAG) {
			return this.filterDataSrv.selectTags();
		}
		if (type === FilterType.PROJECT) {
			return this.filterDataSrv.selectProjects();
		}
		if (type === FilterType.CREATED_BY) {
			return this.filterDataSrv.selectCreatedBy();
		}
		if (type === FilterType.PRODUCT_STATUS) {
			return this.filterDataSrv.selectStatuses();
		}
		// TODO: favorite
		return of([]);
	}

	/** Returns the value to display for data corresponding to a filter. By default "name" is used */
	getDisplayName(filter: any) {
		const { type, value, raw } = filter;
		const columnName = this.displayNames[type] || 'name';
		return raw[columnName];
	}

	/** Opens the panel for filtering on prices */
	togglePricePanel(): void {
		this.pricePanelShown = !this.pricePanelShown;
		this.btnPanelShown = !this.pricePanelShown;
	}

	/** get the map of values for a type */
	getFilterValues(type: FilterType) {
		return this.filterGroup.byType.get(type) || new Map();
	}

	/** when an event wants to add a filter */
	addFilter(filter: Filter): void {
		this.filterSrv.addFilter(filter);
	}

	/** when an event wants to remove a filter */
	removeFilter(filter: Filter): void {
		this.filterSrv.removeFilter(filter);
	}

	/** clears all */
	onClear(): void {
		this.filterSrv.clearGroup();
	}

	/** clears a subset */
	onClearType(type: FilterType): void {
		this.filterSrv.removeFilterType(type);
	}

}
