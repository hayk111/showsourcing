import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { takeUntil, tap, map } from 'rxjs/operators';
import { Entity } from '~models';
import { Filter, FilterGroup, FilterType } from '../../models';
import { FilterService } from '../../services/filter.service';
import { AutoUnsub } from '~utils';

import { FilterDataService } from '../../services/filter.data.service';

@Component({
	selector: 'filters-app',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent extends AutoUnsub implements OnInit {
	/** array version of filters */
	filters$: Observable<Filter[]>;
	/** map<type, Map<value, filter>> to be able to do byType.get(SUPPLIER).has(value) */
	byType$: Observable<Map<FilterType, Map<any, Filter>>>;

	/** Whether the different panel that are displayed when clicking on a button are shown */
	btnPanelShown = true;
	entityPanelShown = false;
	pricePanelShown = false;

	/** for the entity panel we need to pass the correct entityState */
	choices$: Observable<Array<Entity>>;
	relevantChoices$: Observable<Array<Entity>>;
	typeSelected: FilterType;

	/** Those filter types are displayed exactly the same way on screen */
	basicFilterTypes = [
		FilterType.CATEGORY,
		FilterType.TAGS,
		FilterType.PROJECTS
	];
	/** Specifies the display name for elements. If it corresponds to "name", don't add entry here */
	displayNames = {
		createdBy: (raw) => `${raw.lastName} ${raw.firstName}`,
		event: (raw) => raw.description ? raw.description.name : ''
	};
	// different filterTypes
	filterType = FilterType;

	constructor(
		private filterDataSrv: FilterDataService,
		private filterSrv: FilterService
	) {
		super();
	}

	ngOnInit() {
		this.filters$ = this.filterSrv.filters$;
		this.byType$ = this.filterSrv.byType$;
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
			this.choices$ = this.filterDataSrv.selectChoices(type)
				.pipe(
					map((choices: any[]) => choices.filter(choice => !choice.favorite)),
					takeUntil(this._destroy$)
				);
			this.relevantChoices$ = this.filterDataSrv.selectChoices(type)
				.pipe(
					map((choices: any[]) => choices.filter(choice => choice.favorite)),
					takeUntil(this._destroy$)
				);
		}
	}

	/** Returns the value to display for data corresponding to a filter. By default "name" is used */
	getDisplayName(filter: any) {
		const { type, value, raw } = filter;
		const columnName = this.displayNames[type] || 'name';
		return (typeof columnName === 'function') ?
			columnName(raw) : raw[columnName];
	}

	/** Opens the panel for filtering on prices */
	togglePricePanel(): void {
		this.pricePanelShown = !this.pricePanelShown;
		this.btnPanelShown = !this.pricePanelShown;
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
		this.filterSrv.clearAll();
	}

	/** clears a subset */
	onClearType(type: FilterType): void {
		this.filterSrv.removeFilterType(type);
	}

}