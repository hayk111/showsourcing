import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterActions } from '../../store/actions';
import { FilterGroupName, Filter } from '../../models';
import { selectFilterGroup } from '../../store/selectors';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'filter-cloud-app',
	templateUrl: './filter-cloud.component.html',
	styleUrls: ['./filter-cloud.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterCloudComponent implements OnInit {
	@Input() filters: Array<Filter>;
	@Output() removeFilter = new EventEmitter<Filter>();

	constructor() {}

	ngOnInit() {}
}
