import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
	selector: 'request-sorting-menu-sup',
	templateUrl: './request-sorting-menu.component.html',
	styleUrls: ['./request-sorting-menu.component.scss']
})
export class RequestSortingMenuComponent implements OnInit {

	@Input() currentSort: { sortBy: 'creationDate', descending: true };
	// if we need to disable some elements since the models of the request are different
	@Output() sortFromMenu = new EventEmitter<string>();

	constructor() { }

	ngOnInit() { }

}
