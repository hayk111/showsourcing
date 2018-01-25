import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterActions } from '../../../../store/action/filter.action';
import { FilterGroupName, Filter } from '../../../../store/model/filter.model';
import { selectFilterGroup } from '../../../../store/selectors/filter.selectors';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'filter-cloud-app',
	templateUrl: './filter-cloud.component.html',
	styleUrls: ['./filter-cloud.component.scss']
})
export class FilterCloudComponent implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	filters$: Observable<Array<Filter>>;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.filters$ = this.store.select(selectFilterGroup(this.filterGroupName));
	}

	onFilterRemove(filter) {
		this.store.dispatch(FilterActions.removeFilter(filter, this.filterGroupName));
	}

}
