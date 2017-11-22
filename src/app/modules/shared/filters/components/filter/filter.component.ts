import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { EntityState, Entity } from '../../../../store/utils/entities.utils';
import { Filter, FilterGroupName, FilterTarget } from '../../../../store/model/filter.model';
import { selectActiveFiltersForCategory, selectFilterCategory } from '../../../../store/selectors/filter.selectors';
import { FilterActions } from '../../../../store/action/filter.action';
import { MiscActions } from '../../../../store/action/misc.action';
import { merge } from 'rxjs/operators/merge';

@Component({
	selector: 'filter-app',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	@Input() target: FilterTarget;
	@Output() itemClicked = new EventEmitter();
	items$: Observable<Array<Filter>>;


	constructor(private store: Store<any>) { }

	ngOnInit() {
		// select all items selected for target category
		if (this.target !== FilterTarget.prices)
			this.items$ = this.store.select(selectFilterCategory(this.filterGroupName, this.target));
		else {
		// if the target is prices, the filterTarget put in the filter store is either min or maxPrices
			const min$ = this.store.select(
					selectFilterCategory(this.filterGroupName, FilterTarget.minPrices));
			const max$ = this.store.select(
				selectFilterCategory(this.filterGroupName, FilterTarget.maxPrices));
			this.items$ = min$.pipe(merge(max$));
		}
	}

	openFilterListPanel() {
		this.store.dispatch(MiscActions.setProperty('filterSelectionPanel', 'target', this.target));
		this.store.dispatch(MiscActions.setProperty('filterSelectionPanel', 'open', true));
	}

	removeFilter(id: string, target: FilterTarget) {
		this.store.dispatch(FilterActions.removeFilter(this.filterGroupName, target, id));
	}

}
