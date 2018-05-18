import { ChangeDetectionStrategy, Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AutoUnsub } from '~app-root/utils';

import { Filter, FilterType, FilterGroup } from '~shared/filters';
import { FilterService } from '~shared/filters/services/filter.service';
import { Entity } from '~models';

@Component({
	selector: 'product-filters-app',
	templateUrl: './product-filters.component.html',
	styleUrls: ['./product-filters.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFiltersComponent extends AutoUnsub implements OnInit {
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
	// different filterTypes
	filterType = FilterType;

	constructor(private filterSrv: FilterService, private cd: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.filterSrv.filterGroup$
			.pipe(takeUntil(this._destroy$))
			.subscribe(group => {
				this.filterGroup = group;
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
			// this.choices$ = this.store.select(selectEntityArray(entityRepr));
			// this.relevantChoices$ = this.store.select(selectRelevantEntities(entityRepr));
		}
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
