import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FilterActions } from '../../../../store/action/misc/filter.action';
import { selectFilterGroup } from '../../../../store/selectors/misc/filter.selectors';
import { FilterGroupName, Filter } from '../../../../store/model/misc/filter.model';

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
