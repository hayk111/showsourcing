import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterGroupName } from '../../../../store/model/filter.model';

@Component({
	selector: 'filter-search-bar-app',
	templateUrl: './filter-search-bar.component.html',
	styleUrls: ['./filter-search-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSearchBarComponent implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	search = '';
	constructor(private store: Store<any>) { }

	ngOnInit() {
	}

}
