import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'request-sorting-menu-app',
	templateUrl: './request-sorting-menu.component.html',
	styleUrls: ['./request-sorting-menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestSortingMenuComponent implements OnInit {

	@Input() currentSort: { sortBy: 'sentDate', descending: true };
	// if we need to disable some elements since the models of the request are different
	@Output() sortFromMenu = new EventEmitter<string>();

	constructor() { }

	ngOnInit() { }

}
