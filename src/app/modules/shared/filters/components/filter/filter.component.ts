import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { EntityState, Entity, EntityRepresentation, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { Filter, FilterGroupName, FilterRepresentation, filterRepresentationMap } from '../../../../store/model/filter.model';
import { FilterActions } from '../../../../store/action/filter.action';
import { MiscActions } from '../../../../store/action/misc.action';
import { merge } from 'rxjs/operators/merge';
import { selectFilterForEntity, selectFilterForEntities } from '../../../../store/selectors/filter.selectors';
import { FilterSelectionPanelAction } from '../../../../store/action/filter-selection-panel.action';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
	selector: 'filter-app',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	@Input() filterRepr: FilterRepresentation;
	@Output() itemClicked = new EventEmitter();
	items$: Observable<Array<Filter>>;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		// select all items selected for target category
		this.items$ = this.store.select(selectFilterForEntities(this.filterGroupName, this.filterRepr.displayedFilters));
	}

	openFilterListPanel() {
		// setting the target entityRepr of filterSelectionPanel so it knows which filter panel to display
		this.store.dispatch(FilterSelectionPanelAction.open(this.filterRepr));
	}

	// we remove filter when the close icon is clicked
	removeFilter(id: string, repr: FilterRepresentation) {
		this.store.dispatch(FilterActions.removeFilter(this.filterGroupName, repr, id));
	}

}
