import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Filter } from '~shared/filters/models';

@Component({
	selector: 'entity-page-app',
	templateUrl: './entity-page.component.html',
	styleUrls: ['./entity-page.component.scss'],
})
export class EntityPageComponent implements OnInit {
	@Input() pending = true;
	@Input() switchable = true;
	@Input() hasFilters = true;

	@Input() subtitles: Array<string>;

	@Input() view: 'list' | 'card' = 'list';
	// when create button from toppanel is clicked
	@Output() buttonClick = new EventEmitter<any>();
	// when changing from list / card
	@Output() viewChange = new EventEmitter<any>();
	// when filter button from toppanel is clicked
	@Output() filterClick = new EventEmitter<null>();

	constructor() { }

	ngOnInit() { }
}
