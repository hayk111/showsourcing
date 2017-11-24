import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { EntityState, Entity } from '../../../../store/utils/entities.utils';
import { Filter, FilterGroupName, EntityRepresentation, entityRepresentationMap } from '../../../../store/model/filter.model';
import { FilterActions } from '../../../../store/action/filter.action';
import { MiscActions } from '../../../../store/action/misc.action';
import { merge } from 'rxjs/operators/merge';
import { selectFilterForEntity } from '../../../../store/selectors/filter.selectors';
import { FilterSelectionPanelAction } from '../../../../store/action/filter-selection-panel.action';

@Component({
	selector: 'filter-app',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	@Input() target: EntityRepresentation;
	@Output() itemClicked = new EventEmitter();
	items$: Observable<Array<Filter>>;


	constructor(private store: Store<any>) { }

	// TODO: this should be refactored
	ngOnInit() {
		// select all items selected for target category
		if (this.target !== entityRepresentationMap.prices)
			this.items$ = this.store.select(selectFilterForEntity(this.filterGroupName, this.target));
		else {
		// if the target is prices, the filterTarget put in the filter store is either min or maxPrices
			const min$ = this.store.select(
				selectFilterForEntity(this.filterGroupName, entityRepresentationMap.minPrices));
			const max$ = this.store.select(
				selectFilterForEntity(this.filterGroupName, entityRepresentationMap.maxPrices));
			this.items$ = min$.pipe(merge(max$));
		}
	}

	openFilterListPanel() {
		// setting the target entityRepr of filterSelectionPanel so it knows which filter panel to display
		this.store.dispatch(FilterSelectionPanelAction.open(this.target));
	}

	// we remove filter when the close icon is clicked
	removeFilter(id: string, repr: EntityRepresentation) {
		this.store.dispatch(FilterActions.removeFilter(this.filterGroupName, repr, id));
	}

}
