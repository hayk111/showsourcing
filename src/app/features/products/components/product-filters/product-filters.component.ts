import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
	Entity, selectEntityArrayByName, ERM, EntityRepresentation,
	getPluralEntity, fromSupplier, fromEvent, fromCategory, selectEntityProductCount, selectEntityArray,
	selectEntityState, EntityState, entityStateToArray, selectRelevantEntities, getEntityRepr
} from '~app/entity';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { selectFilterByType, FilterGroupName, Filter, FilterActions, FilterType } from '~app/shared/filters';
import { tap, takeUntil, combineLatest, map } from 'rxjs/operators';
import { AutoUnsub } from '~app/app-root/utils';

@Component({
	selector: 'product-filters-app',
	templateUrl: './product-filters.component.html',
	styleUrls: ['./product-filters.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFiltersComponent extends AutoUnsub implements OnInit {
	filterGroupName = FilterGroupName.PRODUCT_PAGE;
	selectedSuppliers$: Observable<any>;
	/** Whether the different panel that are displayed when clicking on a button are shown */
	btnPanelShown = true;
	entityPanelShown = false;
	pricePanelShown = false;
	// Map<filterType, Map<filterValue, filter>>
	// this way we can easily display filters for a given type with
	// map.get(type).values();
	// or check in constant time if a value has been picked already
	// map.get(type).has(value);
	filterMap$: Observable<Map<FilterType, Map<any, Filter>>>;
	filterMap: Map<FilterType, Map<any, Filter>>;
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

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.filterMap$ = this.store.select(selectFilterByType(this.filterGroupName));
		this.filterMap$.pipe(takeUntil(this._destroy$)).subscribe(mymap => this.filterMap = mymap);
	}

	/** opens the panel to select an entity */
	toggleEntityPanel(type: FilterType): void {
		this.entityPanelShown = !this.entityPanelShown;
		this.btnPanelShown = !this.entityPanelShown;

		// when shown we need to change the choices displayed
		if (this.entityPanelShown) {
			// we get the correct entity
			const entityRepr = this.getRepr(type);
			this.typeSelected = type;
			this.choices$ = this.store.select(selectEntityArray(entityRepr));
			this.relevantChoices$ = this.store.select(selectRelevantEntities(entityRepr));
		}
	}

	/** transform a filter type into an entityRepresentation */
	getRepr(type: FilterType): EntityRepresentation {
		switch (type) {
			case FilterType.CREATED_BY:
				return getEntityRepr('teamMember');
			case FilterType.PRODUCT_STATUS:
				return getEntityRepr('productStatus');
			default:
				return getEntityRepr(type);
		}
	}

	/** Opens the panel for filtering on prices */
	togglePricePanel(): void {
		this.pricePanelShown = !this.pricePanelShown;
		this.btnPanelShown = !this.pricePanelShown;
	}

	/** get the map of values for a type */
	getFilterValues(type: FilterType) {
		return this.filterMap.get(type) || new Map();
	}

	/** when an event wants to add a filter */
	addFilter(filter: Filter): void {
		this.store.dispatch(FilterActions.addFilter(filter, this.filterGroupName));
	}

	/** when an event wants to remove a filter */
	removeFilter(filter: Filter): void {
		this.store.dispatch(FilterActions.removeFilter(filter, this.filterGroupName));
	}

	/** clears all */
	onClear(): void {
		this.store.dispatch(FilterActions.clearGroup(this.filterGroupName));
	}

	/** clears a subset */
	onClearType(type: FilterType): void {
		this.store.dispatch(FilterActions.removeFilterType(type, this.filterGroupName));
	}

	/** From the filter type we get the entity representation then the plural name. That's the title */
	getEntityPanelTitle() {
		switch (this.typeSelected) {
			case FilterType.CREATED_BY: return 'Users';
			case FilterType.PRODUCT_STATUS: return 'Statuses';
			default: return getPluralEntity(this.typeSelected);
		}
	}

}
