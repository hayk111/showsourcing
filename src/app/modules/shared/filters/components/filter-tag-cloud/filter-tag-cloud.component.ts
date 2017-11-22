import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { selectFilterGroup, selectFilterGroupFilters } from '../../../../store/selectors/filter.selectors';

@Component({
	selector: 'filter-tag-cloud-app',
	templateUrl: './filter-tag-cloud.component.html',
	styleUrls: ['./filter-tag-cloud.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterTagCloudComponent implements OnInit {
	@Input() filterGroupName;
	filters$: Observable<any>;


	constructor(private store: Store<any>) {

	}

	ngOnInit() {
		if (!this.filterGroupName)
			throw Error (`filterGroupName is undefined but should be a FilterGroupName.
				\n Please make sure it's defined `);
		this.filters$ = this.store.select(selectFilterGroupFilters(this.filterGroupName));
	}

}
