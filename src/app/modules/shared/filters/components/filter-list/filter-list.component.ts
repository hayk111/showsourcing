import { Component, OnInit, Input } from '@angular/core';
import { FilterGroupName, EntityRepresentation } from '../../../../store/model/filter.model';

@Component({
	selector: 'filter-list-app',
	templateUrl: './filter-list.component.html',
	styleUrls: ['./filter-list.component.scss']
})
export class FilterListComponent implements OnInit {
	@Input() targets: Array<EntityRepresentation>;
	@Input() filterGroupName: FilterGroupName;

	constructor() { }

	ngOnInit() {
	}

}
