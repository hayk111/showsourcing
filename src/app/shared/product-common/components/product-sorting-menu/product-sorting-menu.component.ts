import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'product-sorting-menu-app',
	templateUrl: './product-sorting-menu.component.html',
	styleUrls: ['./product-sorting-menu.component.scss']
})
export class ProductSortingMenuComponent implements OnInit {
	@Input() currentSort: { sortBy: 'creationDate', descending: true };
	@Output() sortFromMenu = new EventEmitter<string>();

	constructor() { }

	ngOnInit() { }
}
