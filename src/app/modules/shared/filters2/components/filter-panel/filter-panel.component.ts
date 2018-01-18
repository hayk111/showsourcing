import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { selectFiltersByName, selectFiltersValues } from '../../../../store/selectors/filter.selectors';
import { FilterGroupName, FilterClass, Filter, FilterEntity } from '../../../../store/model/filter.model';
import { SelectableItem } from '../../../inputs/components/vanilla/input-checkbox/input-checkbox.component';
import { take } from 'rxjs/operators';
import { selectEntityArray, selectEntity } from '../../../../store/selectors/utils.selector';
import { FilterEntityPanelActions } from '../../../../store/action/filter-entity-panel.action';
import { EntityRepresentation } from '../../../../store/utils/entities.utils';
import { selectFEPRelevant, selectFEPChoices } from '../../../../store/selectors/filter-entity-panel.selector';

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
	selectedPanel = 'btns-panel';
	// panels often expect a filterClass as input. When a filter btn is clicked the
	// FilterClass associated with said button is sent here.
	selectedFilterClass: FilterClass;

	// panels accept a series of choices as well as values
	choices$: Observable<Array<SelectableItem>>;
	// the selected values are the values selected in choices.
	selectedValues$: Observable<Array<any>>;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.filterMap$ = this.store.select(selectFiltersByName(this.filterGroupName));
	}

	onFilterBtnClick(filterClass: FilterClass) {
		this.selectedFilterClass = filterClass;
		if (filterClass.prototype instanceof FilterEntity) {
			// filterClass extends FilterEntity so it has the method getEntityRepr
			const repr: EntityRepresentation = (filterClass as any).getEntityRepr();
			this.store.dispatch(FilterEntityPanelActions.setEntity(repr));
			this.choices$ = this.store.select(selectFEPChoices);
			this.selectedPanel = 'entity-panel';
		} else {

		}
		this.selectedValues$ = this.store.select(selectFiltersValues(this.filterGroupName, filterClass));
	}

	onEntitySearch(value: string) {
		this.store.dispatch(FilterEntityPanelActions.search(value));
	}

}
