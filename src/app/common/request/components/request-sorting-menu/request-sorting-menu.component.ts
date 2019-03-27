import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'request-sorting-menu-app',
	templateUrl: './request-sorting-menu.component.html',
	styleUrls: ['./request-sorting-menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestSortingMenuComponent implements OnInit {

	@Input() currentSort: { sortBy: 'creationDate', descending: true };
	@Output() sortFromMenu = new EventEmitter<string>();

	constructor() { }

	ngOnInit() { }

}
