import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterGroupName } from '~shared/filters';
import { EntityRepresentation } from '~entity';

@Component({
	selector: 'entity-page-app',
	templateUrl: './entity-page.component.html',
	styleUrls: ['./entity-page.component.scss'],
})
export class EntityPageComponent implements OnInit {
	@Input() repr: EntityRepresentation;
	@Input() pending = true;
	@Input() switchable = true;
	@Input() filterGroupName: FilterGroupName;
	@Input() view: 'list' | 'card' = 'list';
	// when create button from toppanel is clicked
	@Output() createClick = new EventEmitter<any>();
	@Output() viewChange = new EventEmitter<any>();
	// when filter button from toppanel is clicked
	@Output() filterClick = new EventEmitter<null>();

	constructor() {}

	ngOnInit() {}
}
