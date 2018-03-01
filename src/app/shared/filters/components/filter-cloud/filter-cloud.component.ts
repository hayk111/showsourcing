import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterActions } from '~store/action/misc/filter.action';
import { FilterGroupName, Filter } from '~store/model/misc/filter.model';
import { selectFilterGroup } from '~store/selectors/misc/filter.selectors';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'filter-cloud-app',
	templateUrl: './filter-cloud.component.html',
	styleUrls: ['./filter-cloud.component.scss']
})
export class FilterCloudComponent implements OnInit {
	@Input() filters: Array<Filter>;
	@Output() removeFilter = new EventEmitter<Filter>();

	constructor() { }

	ngOnInit() {
	}

}
