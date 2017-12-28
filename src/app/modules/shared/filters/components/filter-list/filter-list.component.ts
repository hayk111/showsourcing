import { Component, OnInit, Input } from '@angular/core';
import { FilterGroupName, FilterRepresentation } from '../../../../store/model/filter.model';
import { EntityRepresentation } from '../../../../store/utils/entities.utils';

@Component({
	selector: 'filter-list-app',
	templateUrl: './filter-list.component.html',
	styleUrls: ['./filter-list.component.scss']
})
export class FilterListComponent implements OnInit {
	@Input() filterReps: Array<FilterRepresentation>;
	@Input() filterGroupName: FilterGroupName;

	constructor() { }

	ngOnInit() {
	}

}
