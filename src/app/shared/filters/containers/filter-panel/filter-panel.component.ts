import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { selectFiltersByName, selectFiltersValues, selectFiltersForClass } from '~store/selectors/misc/filter.selectors';
import { FilterGroupName, FilterClass, Filter, FilterEntity, FilterEntityClass } from '~store/model/misc/filter.model';
import { SelectableItem } from '../../../inputs/components/input-checkbox/input-checkbox.component';
import { take } from 'rxjs/operators';
import { selectEntityArray, selectEntity } from '~store/selectors/misc/utils.selector';
import { FilterEntityPanelActions } from '~store/action/ui/filter-entity-panel.action';
import { EntityRepresentation } from '~store/utils/entities.utils';
import { selectFEPRelevant, selectFEPChoices } from '~store/selectors/ui/filter-entity-panel.selector';
import { FilterActions } from '~store/action/misc/filter.action';
import { FilterPanelAction } from '~store/action/ui/filter-panel.action';

@Component({
	selector: 'filter-panel-app',
	templateUrl: './filter-panel.component.html',
	styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {
	@Input() filterClasses = [];
	@Input() filterGroupName: FilterGroupName;
	filterMap$: Observable<Map<FilterClass, Array<Filter>>>;
	// to select a specific panel
	selectedPanel = 'btns';
	// panels often expect a filterClass as input. When a filter btn is clicked the
	// FilterClass associated with said button is sent here.
	selectedFilterClass: FilterClass;

	// panels accept a series of choices as well as selected choices (selectedValues).
	choices$: Observable<Array<SelectableItem>>;
	// the selected values are the values selected in choices.
	selectedValues$: Observable<Array<any>>;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.filterMap$ = this.store.select(selectFiltersByName(this.filterGroupName));
	}

	// using any for typing here since we are casting the wrong way.
	onFilterBtnClick(filterClass: any) {
		this.selectedFilterClass = filterClass;
		if (filterClass.isForEntity) {
			// filterClass extends FilterEntity so it has the method getEntityRepr
			this.onEntityBtnClick(filterClass as any);
		} else {
			this.selectedPanel = filterClass.filterName;
		}
		this.selectedValues$ = this.store.select(selectFiltersForClass(this.filterGroupName, filterClass));
	}

	// filter btn clicked
	onEntityBtnClick(filterClass: FilterEntityClass) {
		const repr: EntityRepresentation = filterClass.getEntityRepr();
		this.store.dispatch(FilterEntityPanelActions.setEntity(repr));
		this.choices$ = this.store.select(selectFEPChoices);
		this.selectedPanel = 'entity';
	}

	// new filter applied
	onFilterAdded(filter: Filter) {
		this.store.dispatch(FilterActions.addFilter(filter, this.filterGroupName));
	}

	// old filter removed
	onFilterRemoved(filter: Filter) {
		this.store.dispatch(FilterActions.removeFilter(filter, this.filterGroupName));
	}

	onFilterClassRemove(filterClass: FilterClass) {
		this.store.dispatch(FilterActions.removeFiltersForFilterClass(this.filterGroupName, filterClass));
	}

	onEntitySearch(value: string) {
		this.store.dispatch(FilterEntityPanelActions.search(value));
	}

	// no more filters
	reset() {
		this.store.dispatch(FilterActions.clearGroup(this.filterGroupName));
	}

	// closing the panel
	close() {
		if (this.selectedPanel === 'btns')
			this.store.dispatch(FilterPanelAction.close());
		else
			this.selectedPanel = 'btns';
	}
}
