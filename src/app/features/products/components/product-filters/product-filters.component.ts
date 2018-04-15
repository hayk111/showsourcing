import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
	Entity, selectEntityArrayByName, ERM, EntityRepresentation,
	getPluralEntity, fromSupplier, fromEvent, fromCategory, selectEntityProductCount, selectEntityArray,
	selectEntityState, EntityState, entityStateToArray, selectRelevantEntities
} from '~app/entity';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { selectFilterByType, FilterGroupName, Filter, FilterActions } from '~app/shared/filters';
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
	ratingPanelShown = false;
	pricePanelShown = false;
	// Map<filterType, Map<filterValue, filter>>
	// this way we can easily display filters for a given type with
	// map.get(type).values();
	// or check in constant time if a value has been picked already
	// map.get(type).has(value);
	filterMap$: Observable<Map<string, Map<string, Filter>>>;
	filterMap: Map<string, Map<string, Filter>>;
	/** for the entity panel we need to pass the correct entityState */
	choices$: Observable<Array<Entity>>;
	relevantChoices$: Observable<Array<Entity>>;
	entitySelected: EntityRepresentation;

	/** Those entities are displayed exactly the same way on screen */
	basicRepr = [
		ERM.supplier,
		ERM.event,
		ERM.category,
		ERM.tag,
		ERM.project
	];
	teamMemberRepr = ERM.teamMember;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.filterMap$ = this.store.select(selectFilterByType(this.filterGroupName));
		this.filterMap$.pipe(takeUntil(this._destroy$)).subscribe(mymap => this.filterMap = mymap);
	}

	toggleEntityPanel(entityRepr?: EntityRepresentation) {
		this.entityPanelShown = !this.entityPanelShown;
		this.btnPanelShown = !this.entityPanelShown;
		// when shown we need to change the choices displayed
		if (this.entityPanelShown) {
			this.entitySelected = entityRepr;
			this.choices$ = this.store.select(selectEntityArray(entityRepr));
			this.relevantChoices$ = this.store.select(selectRelevantEntities(entityRepr));
		}
	}

	togglePricePanel() {
		this.pricePanelShown = !this.pricePanelShown;
		this.btnPanelShown = !this.pricePanelShown;
	}

	toggleRatingPanel() {
		this.ratingPanelShown = !this.ratingPanelShown;
		this.btnPanelShown = !this.ratingPanelShown;
	}

	getEntityMap(entityRepr: EntityRepresentation) {
		return this.filterMap.get(entityRepr.entityName) || new Map();
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

	onClearType(type) {
		this.store.dispatch(FilterActions.removeFilterType(type, this.filterGroupName));
	}
}
