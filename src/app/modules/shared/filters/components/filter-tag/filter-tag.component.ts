import { Component, OnInit, Input } from '@angular/core';
import { Filter, FilterGroupName } from '../../../../store/model/filter.model';
import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy } from '@angular/core';
import { FilterActions } from '../../../../store/action/filter.action';

@Component({
	selector: 'filter-tag-app',
	templateUrl: './filter-tag.component.html',
	styleUrls: ['./filter-tag.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterTagComponent implements OnInit {
	@Input() filter: Filter;
	@Input() filterGroupName: FilterGroupName;

	constructor(private store: Store<any>) { }

	ngOnInit() {}

	removeFilter(filter: Filter) {
		this.store.dispatch(FilterActions.removeFilter(this.filterGroupName, filter.target, filter.value));
	}
}
