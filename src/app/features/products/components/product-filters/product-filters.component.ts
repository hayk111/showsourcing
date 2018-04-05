import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Entity, selectEntityArrayByName } from '~app/entity';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { selectFilterByType, FilterGroupName, Filter, FilterActions } from '~app/shared/filters';
import { tap, takeUntil } from 'rxjs/operators';
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
	ratingPanelShown = false;
	pricePanelShown = false;
	// Map<filterType, Map<filterValue, filter>>
	// this way we can easily display filters for a given type with
	// map.get(type).values();
	// or check in constant time if a value has been picked already
	// map.get(type).has(value);
	filterMap$: Observable<Map<string, Map<string, Filter>>>;
	filterMap: Map<string, Map<string, Filter>>;
	/** for the entity panel we need to pass the correct entities as choice */
	entityPanelChoices$: Observable<Array<Entity>>;
	entitySelected;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.filterMap$ = this.store.select(selectFilterByType(this.filterGroupName));
		this.filterMap$.pipe(takeUntil(this._destroy$)).subscribe(map => this.filterMap = map);
	}

	toggleEntityPanel(entitySelected: string) {
		this.entitySelected = entitySelected;
		this.entityPanelShown = !this.entityPanelShown;
		this.btnPanelShown = !this.entityPanelShown;
		this.entityPanelChoices$ = this.store.select(selectEntityArrayByName(entitySelected));
	}

	togglePricePanel() {
		this.pricePanelShown = !this.pricePanelShown;
		this.btnPanelShown = !this.pricePanelShown;
	}

	toggleRatingPanel() {
		this.ratingPanelShown = !this.ratingPanelShown;
		this.btnPanelShown = !this.ratingPanelShown;
	}

	getEntityMap(entityName: string) {
		return this.filterMap.get(entityName) || new Map();
	}

	onFilterAdded(filter: Filter) {
		this.store.dispatch(FilterActions.addFilter(filter, this.filterGroupName));
	}

	onFilterRemoved(filter: Filter) {
		this.store.dispatch(FilterActions.removeFilter(filter, this.filterGroupName));
	}

	onClear() {
		this.store.dispatch(FilterActions.clearGroup(this.filterGroupName));
	}

}
