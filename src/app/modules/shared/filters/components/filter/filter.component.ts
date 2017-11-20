import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { EntityState, Entity } from '../../../../store/utils/entities.utils';
import { Filter, FilterGroupName, FilterTarget } from '../../../../store/model/filter.model';
import { selectActiveFiltersForCategory } from '../../../../store/selectors/filter.selectors';
import { FilterActions } from '../../../../store/action/filter.action';
import { MiscActions } from '../../../../store/action/misc.action';

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
	items$: Observable<Array<Entity>>;


	constructor(private store: Store<any>) { }

	ngOnInit() {
		// select all items selected for target category
		this.items$ = this.store.select(selectActiveFiltersForCategory(this.filterGroupName, this.target));
	}

	openFilterListPanel() {
		this.store.dispatch(MiscActions.setProperty('filterSelectionPanel', 'target', this.target));		
		this.store.dispatch(MiscActions.setProperty('filterSelectionPanel', 'open', true));
	}

	removeFilter(id: string) {
		this.store.dispatch(FilterActions.removeFilter(this.filterGroupName, this.target, id));
	}

}
